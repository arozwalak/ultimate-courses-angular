import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StockBranchComponent,
    StockInventoryComponent,
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-unit-testing';
}
