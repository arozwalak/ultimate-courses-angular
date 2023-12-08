import { Routes } from '@angular/router';
import {TemplateComponent} from "./02-template/template.component";

export const routes: Routes = [
  {
    path: 'dynamic-component',
    loadComponent: () =>
      import('./01-dynamic-component/dynamic.component').then((x) => x.DynamicComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./00-auth-form/auth-form.module').then((x) => x.AuthFormModule),
  },
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: 'view-encapsulation',
    loadComponent: () => import('./03-view-encapsulation/view-encapsulation.component').then((x) => x.ViewEncapsulationComponent)
  },
  {
    path: 'change-detection-strategy',
    loadComponent: () => import('./04-change-detection-strategy/change-detection-strategy.component').then((x) => x.ChangeDetectionStrategyComponent)
  },
  {
    path: 'custom-directive',
    loadComponent: () => import('./05-custom-directive/credit-card/credit-card.component').then((x) => x.CreditCardComponent)
  }
];
