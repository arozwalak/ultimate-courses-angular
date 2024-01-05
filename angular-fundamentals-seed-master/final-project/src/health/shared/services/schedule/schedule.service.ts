import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, tap, switchMap, Subject, withLatestFrom} from 'rxjs';
import {Store} from 'store';
import {Meal} from '../meals/meals.service';
import {Workout} from '../workouts/workouts.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";

export interface ScheduleItem {
  meals: Meal[] | null;
  workouts: Workout[] | null;
  section: string;
  timestamp: number;
  key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;

  [key: string]: any;
}

@Injectable()
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();
  schedule$!: Observable<ScheduleItem[]>;
  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([ items, section ]: any) => {
      console.log(items, section);
      const id = section.data.key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      }

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      console.log(id)
      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$.pipe(
    tap((next: any) => this.store.set('selected', next)));

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => {
      console.log(next);
      return this.store.set('list', next)
    })
  )
  uid!: string | undefined;

  constructor(
    private store: Store,
    private db: AngularFireDatabase) {
  }

  udpateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  setSchedule(next: any) {
    return new Promise<void>((resolve) => {
      if (next?.uid) {
        this.uid = next.uid;

        this.schedule$ = this.date$.pipe(
          tap((next) => this.store.set('date', next)),
          map((day: any) => {
            const startAt = new Date(
              day.getFullYear(),
              day.getMonth(),
              day.getDate()
            ).getTime();

            const endAt =
              new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate() + 1
              ).getTime() - 1;

            return {startAt, endAt};
          }),
          switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
          map((data: any) => {
            const mapped: ScheduleList = {};

            for (const prop of data) {
              const p = prop.payload.val();
              if (!mapped[p.section]) {
                mapped[p.section] = p;
              } else {
                mapped[p.section] = {...mapped[p.section], ...p}
              }
            }

            return mapped;
          }),
          tap((next: any) => this.store.set('schedule', next))
        );
        resolve();
      }
    })
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, (ref) =>
      ref.orderByChild('timestamp').startAt(startAt).endAt(endAt))
      .snapshotChanges();
  }
}
