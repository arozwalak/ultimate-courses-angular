import { Component } from '@angular/core';
import {CreditCardDirective} from "../credit-card.directive";
import {TooltipDirective} from "../tooltip.directive";
import {CommonModule} from "@angular/common";
import {MyForDirective} from "../my-for.directive";

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [CommonModule, CreditCardDirective, TooltipDirective, MyForDirective],
  template: `
    <div>
      <label>
        Credit Card Number
        <input
          type="text"
          name="credit-card"
          placeholder="Enter your 16-digit card number"
          credit-card>
      </label>
      <label tooltip="3 digits, back of your card" #myTooltip="tooltip">
        Enter your security code
        <span
          (mouseover)="myTooltip.show()"
          (mouseout)="myTooltip.hide()">
          (?)
        </span>
        <input type="text">
      </label>

      <ul>
        <li *myFor="let item of items; let i = index;">
          {{ i }} Member: {{ item.name | json }}
        </li>
        <ng-template myFor [myForOf]="items" let-item let-i="index">
          <li>
            {{ i }} Member: {{ item.name | json }}
          </li>
        </ng-template>
      </ul>
    </div>
  `,
  styles: `
  `
})
export class CreditCardComponent {

  items = [{
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  },{
    name: 'Tom Delonge',
    age: 45,
    location: 'London'
  },{
    name: 'Travis Barker',
    age: 46,
    location: 'New York'
  }]

  constructor() {
    setTimeout(() => {
      this.items = [...this.items, { name: 'Matt Skiba', age: 40, location: 'California' }];
    }, 2000);
  }
}
