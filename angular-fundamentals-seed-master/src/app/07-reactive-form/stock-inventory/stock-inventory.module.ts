import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import {RouterModule, Routes} from "@angular/router";

import { StockInventoryComponent } from './containers/stock-inventory/stock-inventory.component';
import {StockBranchComponent} from "./components/stock-branch/stock-branch.component";
import {StockProductsComponent} from "./components/stock-products/stock-products.component";
import {StockSelectorComponent} from "./components/stock-selector/stock-selector.component";
import {HttpClientModule} from "@angular/common/http";
import {StockInventoryService} from "./services/stock-inventory.service";

const routes: Routes = [
  {
    path: '',
    component: StockInventoryComponent
  }
]
@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    StockInventoryService
  ]
})
export class StockInventoryModule {

}
