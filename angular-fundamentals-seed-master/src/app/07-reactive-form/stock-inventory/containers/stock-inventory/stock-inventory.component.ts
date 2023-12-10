import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';

import { Item, Product } from '../../models/product.interface';
import { StockInventoryService } from '../../services/stock-inventory.service';

@Component({
  selector: 'app-stock-inventory',
  styleUrls: ['./stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <stock-branch [store]="store"> </stock-branch>

        <stock-selector
          [selector]="selector"
          [products]="products"
          (added)="addStock($event)"
        >
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)"
        >
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency : 'USD' : true }}
        </div>

        <div class="stock-inventory__buttons">
          <button type="submit" [disabled]="form.invalid">Order stock</button>
        </div>

        <pre>
          {{ form.value | json }}
        </pre
        >
      </form>
    </div>
  `,
})
export class StockInventoryComponent implements OnInit {
  products!: Product[];
  productMap!: Map<number, Product>;
  total!: number;

  form = this.fb.group({
    store: this.fb.group({
      branch: '',
      code: '',
    }),
    selector: this.createStock({}),
    stock: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  get selector() {
    return this.form.get('selector') as FormGroup;
  }
  get store() {
    return this.form.get('store') as FormGroup;
  }
  get stock() {
    return this.form.get('stock') as FormArray;
  }

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    forkJoin([cart, products]).subscribe(
      ([cart, products]: [Item[], Product[]]) => {
        const myMap = products.map<[number, Product]>((product) => [
          product.id,
          product,
        ]);

        this.productMap = new Map<number, Product>(myMap);
        this.products = products;
        cart.forEach((item: Item) => this.addStock(item));

        this.calculateTotal(this.stock.value);
        this.stock.valueChanges.subscribe((value: Item[]) => {
          this.calculateTotal(value);
        });
      }
    );
  }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      return (
        prev +
        next.quantity * (this.productMap.get(next.product_id)?.price || 0)
      );
    }, 0);
    this.total = total;
  }

  createStock(stock: any) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10,
    });
  }

  addStock(stock: any) {
    this.stock.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup; index: number }) {
    this.stock.removeAt(index);
  }
  onSubmit() {
    console.log('Submit', this.form.value);
  }
}
