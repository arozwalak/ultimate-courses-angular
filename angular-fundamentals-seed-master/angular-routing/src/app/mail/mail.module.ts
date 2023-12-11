import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MailFolderComponent } from './containers/mail-folder/mail-folder.component';
import { MailItemComponent } from './components/mail-item/mail-item.component';
import { MailAppComponent } from './components/mail-app/mail-app.component';
import { MailViewComponent } from "./components/mail-view/mail-view.component";

import { MailService } from "./mail.service";

import { mailFolderResolve } from "./containers/mail-folder/mail-folder.resolve";
import { mailViewResolve } from "./components/mail-view/mail-view.resolve";
import {AuthModule} from "../auth/auth.module";
import {canActivate, canActivateChild} from "../auth/auth.guard";
import {canDeactivate} from "./components/mail-view/mail-view.guard";

export const ROUTES: Routes = [
  {
    path: 'mail',
    component: MailAppComponent,
    // canActivate: [canActivate],
    canActivateChild: [canActivateChild],
    children: [
      { path: 'folder/:name',
        component: MailFolderComponent,
        resolve: {
          messages: mailFolderResolve
        }
      },
      {
        path: 'message/:id',
        component: MailViewComponent,
        outlet: 'pane',
        canDeactivate: [canDeactivate],
        resolve: {
          message: mailViewResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AuthModule
  ],
  declarations: [
    MailFolderComponent,
    MailAppComponent,
    MailItemComponent,
    MailViewComponent
  ],
  exports: [
    MailAppComponent
  ],
  providers: [
    MailService
  ]
})
export class MailModule {}
