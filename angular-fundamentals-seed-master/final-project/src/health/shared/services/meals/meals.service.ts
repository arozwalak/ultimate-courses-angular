import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name?: string | undefined;
  ingredients?: string[] | undefined;
  timestamp?: number | undefined;
  key?: string | null | undefined;
  $exists?: (() => boolean) | undefined;
}

@Injectable()
export class MealsService {
  meals$!: Observable<Meal[]>;
  uid!: string | undefined;

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.init();
  }

  async init() {
    this.uid = (await this.authService.user())?.uid;

    this.meals$ = this.db
      .list<Meal>(`meals/${this.uid}`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({ key: a.key, ...a.payload.val() }))
        ),
        tap((next) => {
          this.store.set('meals', next);
        })
      );
  }

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
