import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from './shared/shared.module';
import { FirebaseOptions } from 'firebase/app';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((x) => x.LoginModule),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then((x) => x.RegisterModule),
      },
    ],
  },
];

export const firebaseOptions: FirebaseOptions = {
  apiKey: 'AIzaSyDZVoq2X-4eFIPNfY_JC2iGtoZHjUK9R6A',
  authDomain: 'fitness-app-7b1c5.firebaseapp.com',
  databaseURL:
    'https://fitness-app-7b1c5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fitness-app-7b1c5',
  storageBucket: 'fitness-app-7b1c5.appspot.com',
  messagingSenderId: '698943607782',
  appId: '1:698943607782:web:53fdc2172ac9611efb7c27',
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseOptions),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot(),
  ],
})
export class AuthModule {
  constructor() {}
}
