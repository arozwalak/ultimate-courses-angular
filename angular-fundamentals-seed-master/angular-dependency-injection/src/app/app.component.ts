import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PizzaViewerComponent } from './containers/pizza-viewer.component';
import { SideViewerComponent } from './containers/side-viewer.component';
import { DrinkViewerComponent } from './containers/drink-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { API_TOKEN } from './token';
import { FoodService } from './food.service';
import { FoodStoreService, Store } from './food-store/food-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    PizzaViewerComponent,
    SideViewerComponent,
    DrinkViewerComponent,
  ],
  providers: [FoodService, { provide: API_TOKEN, useValue: '/api/drinks' }],
  styles: [
    `
      pizza-viewer,
      side-viewer,
      drink-viewer {
        display: block;
        border-bottom: 2px solid #eee;
        padding: 20px 0;
      }
    `,
  ],
  template: `
    <div>
      <!-- <div>Food Store ({{ (store | async)?.name }})</div> -->

      <div>Counter: {{ counter }}</div>

      <!-- <pizza-viewer></pizza-viewer>
      <side-viewer></side-viewer>
      <drink-viewer></drink-viewer> -->
    </div>
  `,
})
export class AppComponent implements OnInit {
  store: Observable<Store> = this.foodService.getStore();
  counter = 0;
  constructor(private foodService: FoodStoreService, private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      for (let i = 0; i < 100; i++) {
        setTimeout(() => this.counter++);
      }
      this.zone.run(() => {
        setTimeout(() => (this.counter = this.counter), 1000);
      });
    });
  }

  ngDoCheck() {
    console.log('Change detection has been run!');
  }
}
