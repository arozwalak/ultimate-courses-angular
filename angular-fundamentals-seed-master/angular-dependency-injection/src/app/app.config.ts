import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FoodStoreModule } from './food-store/food-store.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      FoodStoreModule.forRoot({
        storeId: 10292,
        storeToken: 'eca938c99a0e9ff91029dc',
      })
    ),
  ],
};
