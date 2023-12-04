// components
import { Routes } from '@angular/router';

// services

// guards

// directives

export const AdminRoutes: Routes = [
  {
    path: 'donuts',
    loadComponent: () =>
      import('./containers/donut-list/donut-list.component').then(
        (x) => x.DonutListComponent
      ),
  },
  {
    path: 'donuts/new',
    loadComponent: () =>
      import('../admin/containers/donut-single/donut-single.component').then(
        (x) => x.DonutSingleComponent
      ),
    data: { isEdit: false },
  },
  {
    path: 'donuts/:id',
    loadComponent: () =>
      import('../admin/containers/donut-single/donut-single.component').then(
        (x) => x.DonutSingleComponent
      ),
    data: { isEdit: true },
  },
  { path: '', pathMatch: 'full', redirectTo: 'donuts' },
];
