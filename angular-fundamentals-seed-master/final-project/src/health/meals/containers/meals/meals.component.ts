import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';
import {Store} from 'store';
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";

@Component({
  selector: 'app-meals',
  styleUrl: 'meals.component.scss',
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/assets/img/food.svg" alt=""/>
          Your meals
        </h1>
        <a class="btn__add" [routerLink]="['../meals/new']">
          <img src="/assets/img/add-white.svg" alt=""/>
          New Meal
        </a>
      </div>
      <div *ngIf="meals$ | async as meals; else loading">
        <div class="message" *ngIf="!meals.length">
          <img src="/assets/img/face.svg" alt=""/>
          No meals, add a new meal to start
        </div>
        <app-list-item
          *ngFor="let meal of meals"
          [item]="meal"
          (remove)="removeMeal($event)"
        ></app-list-item>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt=""/>
          Fetching meals...
        </div>
      </ng-template>
    </div>
  `,
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$!: Observable<Meal[]>;
  subscription!: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService,
    private mealsService: MealsService) {
  }

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.authService.auth$.subscribe((next) =>
      this.mealsService.setMeals(next).then(() => {
        this.subscription = this.mealsService.meals$.subscribe();
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(event: Meal) {
    if (event?.key) {
      this.mealsService.removeMeal(event.key);
    }
  }
}
