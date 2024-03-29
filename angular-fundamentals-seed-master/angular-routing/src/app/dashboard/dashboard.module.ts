import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./containers/dashboard/dashboard.component";
import {CommonModule} from "@angular/common";

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
