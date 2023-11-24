import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';

@Component({
  selector: 'app-donut-list',
  template: `
    <div>
      <ng-container *ngIf="donuts.length; then cards; else nothing"></ng-container>
    </div>
<!--
    <div>
      <ng-template [ngIf]="donuts.length" [ngIfThen]="cards" [ngIfElse]="nothing"></ng-template>
    </div>
 -->
    <ng-template #cards>
      <app-donut-card *ngFor="let donut of donuts; trackBy: trackById" [donut]="donut"></app-donut-card>
<!--
      <ng-template ngFor [ngForOf]="donuts" let-donut let-i="index">
        <app-donut-card [donut]=donut></app-donut-card>
        {{ i }}
      </ng-template>
 -->
<!--
      <div [style.color]="o ? 'red' : 'blue'"
      *ngFor="let donut of donuts; trackBy: trackById; index as i; odd as o; even as e">
        {{ i + 1 }}
        {{ o }}
        {{ e }}
      </div>
       -->
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
        promo: 'limited',
        description: 'For the pure chocoholic.'
      },
      {
        id: 'j23k4j',
        name: 'Glazed Fudge',
        icon: 'glazed-fudge',
        price: 129,
        promo: 'new',
        description: 'Sticky perfection.'
      },
      {
        id: 'k3j4k2l',
        name: 'Caramel Swirl',
        icon: 'caramel-swirl',
        price: 129,
        description: 'For drizzled with caramel.'
      },
      {
        id: '8d9fu8',
        name: 'Sour Supreme',
        icon: 'sour-supreme',
        price: 139,
        description: 'For the sour advocate.'
      },
      {
        id: '3hg9dsj',
        name: 'Zesty Lemon',
        icon: 'zesty-lemon',
        price: 129,
        description: 'Delicious lucious lemon.'
      }
    ];
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
