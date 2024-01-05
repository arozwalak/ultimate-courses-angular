import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map, tap, switchMap} from 'rxjs';
import {Store} from 'store';
import {Meal} from '../meals/meals.service';
import {Workout} from '../workouts/workouts.service';
import {AngularFireDatabase} from "@angular/fire/compat/database";

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
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
  schedule$!: Observable<ScheduleItem[]>;
  uid!: string | undefined;

  constructor(
    private store: Store,
    private db: AngularFireDatabase) {
  }

  udpateDate(date: Date) {
    this.date$.next(date);
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
              if (!mapped[prop.section]) {
                mapped[prop.section] = prop;
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

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, (ref) =>
      ref.orderByChild('timestamp').startAt(startAt).endAt(endAt))
      .snapshotChanges();
  }
}
