import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import {
  Workout,
  WorkoutsService,
} from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-workout',
  styleUrls: ['workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/assets/img/workout.svg" alt="" />
          <span *ngIf="workout$ | async as workout; else title">
            {{ workout?.name ? 'Edit' : 'Create' }} workout
          </span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading">
        <app-workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
        >
        </app-workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt="" />
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `,
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$!: Observable<Workout | { name: string } | undefined>;
  subscription!: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params['id'];
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const key = this.route.snapshot.params['id'];
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap((param: any) => this.workoutsService.getWorkout(param.id))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
