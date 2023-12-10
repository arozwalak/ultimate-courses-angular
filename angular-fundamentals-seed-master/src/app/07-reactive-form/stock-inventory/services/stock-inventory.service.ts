import { Injectable } from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable()
export class StockInventoryService {
  constructor(
    private http: HttpClient
  ) {
  }

  getCartItems(): Observable<any> {
    return this.http.get('/api/cart');
  }

  getProducts(): Observable<any> {
    return this.http.get('/api/products');
  }
}
