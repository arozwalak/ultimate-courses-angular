import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AuthFormComponent } from "./auth-form.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: AuthFormComponent,
  },
];
@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  exports: [
    AuthFormComponent
  ],
})
export class AuthFormModule {}
