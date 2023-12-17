import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FoodService } from '../food.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Side {
  name: string;
  price: number;
}

export function SideFactory(http: HttpClient) {
  return new FoodService(http, '/api/sides');
}

export abstract class SidesService {
  getSides!: () => Observable<Side[]>;
}
@Component({
  standalone: true,
  selector: 'side-viewer',
  imports: [CommonModule],
  providers: [{ provide: SidesService, useExisting: FoodService }],
  template: `
    <div>
      <div *ngFor="let item of items$ | async">
        {{ item.name }} {{ item.price | currency : 'USD' : 'symbol' }}
      </div>
    </div>
  `,
})
export class SideViewerComponent implements OnInit {
  items$!: Observable<Side[]>;
  constructor(private foodService: SidesService) {}
  ngOnInit() {
    this.items$ = this.foodService.getSides();
  }
}
