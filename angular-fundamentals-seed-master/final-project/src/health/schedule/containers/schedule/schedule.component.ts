import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
  ScheduleItem,
  ScheduleService,
} from 'src/health/shared/services/schedule/schedule.service';
import { Store } from 'store';

@Component({
  selector: 'app-schedule',
  styleUrl: 'schedule.component.scss',
  template: `
    <div class="schedule">
      <app-schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
      >
      </app-schedule-calendar>
    </div>
  `,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$!: Observable<Date | null>;
  schedule$!: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];
  constructor(private store: Store, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.subscriptions = [this.scheduleService.schedule$.subscribe()];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.udpateDate(date);
  }
}
