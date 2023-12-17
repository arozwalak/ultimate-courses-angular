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

export abstract class DrinkService {
  getDrinks!: () => Observable<Drink[]>;
}

@Component({
  standalone: true,
  selector: 'drink-viewer',
  imports: [CommonModule],
  providers: [{ provide: DrinkService, useExisting: FoodService }],
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
  constructor(private foodService: DrinkService) {}
  ngOnInit() {
    this.items$ = this.foodService.getDrinks();
  }
}
