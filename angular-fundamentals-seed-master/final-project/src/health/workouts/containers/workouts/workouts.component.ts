import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';
import { Store } from 'store';

@Component({
  selector: 'app-workouts',
  styleUrl: 'workouts.component.scss',
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="/assets/img/workout.svg" alt="" />
          Your workouts
        </h1>
        <a class="btn__add" [routerLink]="['../workouts/new']">
          <img src="/assets/img/add-white.svg" alt="" />
          New Workout
        </a>
      </div>
      <div *ngIf="workouts$ | async as workouts; else loading">
        <div class="message" *ngIf="!workouts.length">
          <img src="/assets/img/face.svg" alt="" />
          No workouts, add a new workout to start
        </div>
        <app-list-item
          *ngFor="let workout of workouts"
          [item]="workout"
          (remove)="removeWorkout($event)"
        ></app-list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt="" />
          Fetching workouts...
        </div>
      </ng-template>
    </div>
  `,
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$!: Observable<Workout[]>;
  subscription!: Subscription;

  constructor(private store: Store, private workoutsService: WorkoutsService) {}

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeWorkout(event: Workout) {
    if (event?.key) {
      this.workoutsService.removeWorkout(event.key);
    }
  }
}
