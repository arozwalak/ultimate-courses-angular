import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
  ScheduleItem,
  ScheduleService,
} from 'src/health/shared/services/schedule/schedule.service';
import { Store } from 'store';
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";
import {Workout, WorkoutsService} from "../../../shared/services/workouts/workouts.service";

@Component({
  selector: 'app-schedule',
  styleUrl: 'schedule.component.scss',
  template: `
    <div class="schedule">
      <app-schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      >
      </app-schedule-calendar>

      <app-schedule-assign *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()">
      </app-schedule-assign>
    </div>
  `,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;
  date$!: Observable<Date | null>;
  schedule$!: Observable<ScheduleItem[]>;
  selected$!: Observable<any>;
  list$!: Observable<Meal[] | Workout[]>;
  subscriptions: Subscription[] = [];
  constructor(
    private store: Store,
    private authService: AuthService,
    private mealService: MealsService,
    private workoutService: WorkoutsService,
    private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    this.authService.auth$.subscribe((next) => {
      Promise.all([
        this.scheduleService.setSchedule(next),
        this.mealService.setMeals(next),
        this.workoutService.setWorkouts(next)]).then(() => {
        this.subscriptions = [
          this.scheduleService.schedule$.subscribe(),
          this.scheduleService.selected$.subscribe(),
          this.scheduleService.list$.subscribe(),
          this.scheduleService.items$.subscribe(),
          this.mealService.meals$.subscribe(),
          this.workoutService.workouts$.subscribe(),
        ];
      })
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.udpateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  closeAssign() {
    this.open = false;
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }
}
