import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import {
  Meal,
  MealsService,
} from 'src/health/shared/services/meals/meals.service';

@Component({
  selector: 'app-meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/img/food.svg" alt="" />
          <span *ngIf="meal$ | async as meal; else title">
            {{ meal?.name ? 'Edit' : 'Create' }} meal
          </span>
          <ng-template #title>Loading...</ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading">
        <app-meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)"
        >
        </app-meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/img/loading.svg" alt="" />
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `,
})
export class MealComponent implements OnInit, OnDestroy {
  meal$!: Observable<Meal | { name: string } | undefined>;
  subscription!: Subscription;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async addMeal(event: Meal) {
    await this.mealsService.addMeal(event);
    this.backToMeals();
  }

  async updateMeal(event: Meal) {
    const key = this.route.snapshot.params['id'];
    await this.mealsService.updateMeal(key, event);
    this.backToMeals();
  }

  async removeMeal(event: Meal) {
    const key = this.route.snapshot.params['id'];
    await this.mealsService.removeMeal(key);
    this.backToMeals();
  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap((param: any) => this.mealsService.getMeal(param.id))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
