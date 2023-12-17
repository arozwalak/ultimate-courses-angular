import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FoodService } from '../food.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Pizza {
  name: string;
  price: number;
}

export function PizzaFactory(http: HttpClient) {
  return new FoodService(http, '/api/pizzas');
}

@Component({
  standalone: true,
  selector: 'pizza-viewer',
  imports: [CommonModule],
  providers: [
    {
      provide: FoodService,
      useFactory: PizzaFactory,
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
export class PizzaViewerComponent implements OnInit {
  items$!: Observable<Pizza[]>;
  constructor(private foodService: FoodService) {}
  ngOnInit() {
    this.items$ = this.foodService.getFood();
  }
}
