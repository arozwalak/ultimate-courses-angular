import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FOOD_STORE_CONFIG, FoodStoreConfig } from './config';
import { Observable, map } from 'rxjs';

export type Store = {
  id: number;
  name: string;
  token: string;
};

@Injectable()
export class FoodStoreService {
  constructor(
    private http: HttpClient,
    @Inject(FOOD_STORE_CONFIG) private config: FoodStoreConfig
  ) {}

  getStore(): Observable<Store> {
    let headers = new HttpHeaders();
    headers = headers.append('id', this.config.storeId.toString());
    headers = headers.append('token', this.config.storeToken);

    console.log(headers);
    return this.http
      .get<Store[]>(`/api/stores`, {
        headers,
      })
      .pipe(
        map((stores: Store[]) => {
          return stores.filter(
            (store: Store) =>
              store.id === this.config.storeId &&
              store.token === this.config.storeToken
          )[0];
        })
      );
  }
}
