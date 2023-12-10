import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Product } from '../../models/product.interface';

@Component({
  selector: 'stock-selector',
  styleUrls: ['stock-selector.component.scss'],
  template: `
    <div class="stock-selector" [formGroup]="selector">
      <select formControlName="product_id">
        <option value="">Select stock</option>
        <option *ngFor="let product of products" [value]="product.id">
          {{ product.name }}
        </option>
      </select>
      <stock-counter
        [step]="10"
        [min]="10"
        [max]="1000"
        formControlName="quantity"
      ></stock-counter>
      <button type="button" (click)="onAdd()">Add stock</button>
    </div>
  `,
})
export class StockSelectorComponent {
  @Input()
  selector!: FormGroup;

  @Input()
  products!: Product[];

  @Output()
  added = new EventEmitter<any>();

  onAdd() {
    this.added.emit(this.selector.value);
    // this.selector.patchValue({ product_id: '' }); // doesn't clear ng-touched and ng-dirty classes
    // this.selector.setValue({ product_id: '', quantity: 10 }); // requires values for each control
    this.selector.reset({
      product_id: '',
      quantity: 10,
    });
  }
}
