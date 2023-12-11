import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PreloadingStrategy, Route, RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {Observable, of} from "rxjs";

import { MailModule } from './mail/mail.module';
import {canMatch} from "./auth/auth.guard";
import {AuthModule} from "./auth/auth.module";

export const ROUTES: Routes = [
  { path: 'dashboard', canMatch: [canMatch], data: { preload: true }, loadChildren: () => import('./dashboard/dashboard.module').then((x) => x.DashboardModule)},
  { path: '**', redirectTo: 'mail/folder/inbox' }
];

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] ? fn() : of(null);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [CustomPreload],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload }/*, { preloadingStrategy: PreloadAllModules, enableTracing: true }*/),
    MailModule,
    AuthModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
