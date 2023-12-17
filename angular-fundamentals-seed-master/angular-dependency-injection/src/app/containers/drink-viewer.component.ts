import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FoodService } from '../food.service';
import { CommonModule } from '@angular/common';

interface Drink {
  name: string;
  price: number;
}

@Component({
  standalone: true,
  selector: 'drink-viewer',
  imports: [CommonModule],
  providers: [FoodService],
  template: `
    <div>
      <div *ngFor="let item of items$ | async">
        {{ item.name }} {{ item.price | currency : 'USD' : true }}
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
