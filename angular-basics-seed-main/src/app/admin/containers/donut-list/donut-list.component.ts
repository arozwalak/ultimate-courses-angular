import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

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

  constructor(private donutService: DonutService) {}
  
  ngOnInit() {
    this.donuts = this.donutService.read();
  }

  trackById(index: number, value: Donut) {
    return value.id;
  }
}
