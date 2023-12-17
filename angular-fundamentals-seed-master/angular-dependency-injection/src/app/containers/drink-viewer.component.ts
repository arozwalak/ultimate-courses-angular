import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FoodService } from '../food.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Drink {
  name: string;
  price: number;
}

export function DrinkFactory(http: HttpClient) {
  return new FoodService(http, '/api/drinks');
}

@Component({
  standalone: true,
  selector: 'drink-viewer',
  imports: [CommonModule],
  providers: [
    {
      provide: FoodService,
      useFactory: DrinkFactory,
      deps: [HttpClient],
    },
  ],
  template: `
    <div>
      <div *ngFor="let item of items$ | async">
        {{ item.name }} {{ item.price | currency : 'USD' : 'symbol' }}
      </div>
    </div>
  `,
})
export class DrinkViewerComponent implements OnInit {
  items$!: Observable<Drink[]>;
  constructor(private foodService: FoodService) {}
  ngOnInit() {
    this.items$ = this.foodService.getFood();
  }
}
