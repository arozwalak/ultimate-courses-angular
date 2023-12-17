import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PizzaViewerComponent } from './containers/pizza-viewer.component';
import { SideViewerComponent } from './containers/side-viewer.component';
import { DrinkViewerComponent } from './containers/drink-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { API_TOKEN } from './token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    PizzaViewerComponent,
    SideViewerComponent,
    DrinkViewerComponent,
  ],
  providers: [{ provide: API_TOKEN, useValue: '/api/pizzas' }],
  styles: [
    `
      pizza-viewer,
      side-viewer,
      drink-viewer {
        display: block;
        border-bottom: 2px solid #eee;
        padding: 20px 0;
      }
    `,
  ],
  template: `
    <div>
      <pizza-viewer></pizza-viewer>
      <side-viewer></side-viewer>
      <drink-viewer></drink-viewer>
    </div>
  `,
})
export class AppComponent {}
