import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {FileSizePipe} from "./file-size/file-size.pipe";


export const ROUTES: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    FileSizePipe
  ],
  providers: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
