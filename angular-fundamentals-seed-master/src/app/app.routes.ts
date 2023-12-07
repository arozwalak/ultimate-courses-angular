import { Routes } from '@angular/router';
import {TemplateComponent} from "./template/template.component";

export const routes: Routes = [
  {
    path: 'dynamic-component',
    loadComponent: () =>
      import('./dynamic-component/dynamic.component').then((x) => x.DynamicComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth-form/auth-form.module').then((x) => x.AuthFormModule),
  },
  {
    path: 'template',
    component: TemplateComponent
  }
];
