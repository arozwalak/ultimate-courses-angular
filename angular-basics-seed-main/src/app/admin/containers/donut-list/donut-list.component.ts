import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-list',
  template: `
    <div>
      <ng-container *ngIf="donuts.length; then cards; else nothing"></ng-container>
    </div>

    <div>
      <ng-template [ngIf]="donuts.length" [ngIfThen]="cards" [ngIfElse]="nothing"></ng-template>
    </div>

    <ng-template #cards>
      <app-donut-card *ngFor="let donut of donuts" [donut]="donut"></app-donut-card>
    </ng-template>

    <ng-template #nothing>
      <p>No Donuts here...</p>
    </ng-template>
  `,
  styles: [
  ]
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  ngOnInit() {
    this.donuts = [
      {
        id: 's98f9sfs',
        name: 'Just Chocolate',
        icon: 'just-chocolate',
        price: 119,
        description: 'For the pure chocoholic.'
      },
      {
        id: 'j23k4j',
        name: 'Glazed Fudge',
        icon: 'glazed-fudge',
        price: 129,
        promo: true,
        description: 'Sticky perfection.'
      },
      {
        id: 'k3j4k2l',
        name: 'Caramel Swirl',
        icon: 'caramel-swirl',
        price: 129,
        description: 'For drizzled with caramel.'
      }
    ];
  }
}
