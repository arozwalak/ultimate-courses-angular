import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, filter, map, of, tap } from 'rxjs';
import { Store } from 'store';

export interface Workout {
  name?: string | undefined;
  type?: 'endurance' | 'strength' | undefined;
  strength?: any;
  endurance?: any;
  timestamp?: number | undefined;
  key?: string | null | undefined;
  $exists?: (() => boolean) | undefined;
}

@Injectable()
export class WorkoutsService {
  workouts$!: Observable<Workout[]>;
  uid!: string | undefined;

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ) {}

  getWorkout(key: string) {
    if (!key) {
      return of({ name: '' });
    }

    return this.store.select<Workout[]>('workouts').pipe(
      filter(Boolean),
      map((workouts: Workout[]) =>
        workouts.find((workout: Workout) => workout.key === key)
      )
    );
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }

  setWorkouts(next: any) {
    return new Promise<void>((resolve) => {
      if (next?.uid) {
        this.uid = next.uid;

        this.workouts$ = this.db
          .list<Workout>(`workouts/${this.uid}`)
          .snapshotChanges()
          .pipe(
            map((actions) =>
              actions.map((a) => ({ key: a.key, ...a.payload.val() }))
            ),
            tap((next) => {
              this.store.set('workouts', next);
            })
          );
        resolve();
      }
    })
  }
}
