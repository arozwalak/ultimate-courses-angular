import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { forkJoin, map } from 'rxjs';

import { StockValidators } from './stock-inventory.validators';
import { Item, Product } from '../../models/product.interface';
import { StockInventoryService } from '../../services/stock-inventory.service';
import { StockBranchComponent } from '../../components/stock-branch/stock-branch.component';
import { StockProductsComponent } from '../../components/stock-products/stock-products.component';
import { StockSelectorComponent } from '../../components/stock-selector/stock-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-stock-inventory',
  imports: [
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit()">
        <stock-branch [store]="store"> </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency : 'USD' : true }}
        </div>

        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
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

  form = this.fb.group(
    {
      store: this.fb.group({
        branch: [
          '',
          [Validators.required, StockValidators.checkBranch],
          [this.validateBranch.bind(this)],
        ],
        code: ['', Validators.required],
      }),
      selector: this.createStock({}),
      stock: this.fb.array([]),
    },
    { validators: StockValidators.checkStockExists }
  );

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

  validateBranch(control: AbstractControl) {
    return this.stockService
      .checkBranchId(control.value)
      .pipe(
        map((response: boolean) => (response ? null : { unknownBranch: true }))
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
