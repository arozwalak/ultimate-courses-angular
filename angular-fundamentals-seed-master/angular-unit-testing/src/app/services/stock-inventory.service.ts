import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Item, Product } from '../models/product.interface';

@Injectable()
export class StockInventoryService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>('/api/cart')
      .pipe(catchError((err: any) => throwError(() => new Error(err))));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>('/api/products')
      .pipe(catchError((err: any) => throwError(() => new Error(err))));
  }

  checkBranchId(id: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<any[]>('/api/branches', { params }).pipe(
      map((response: any[]) => !!response.length),
      catchError((err: any) => throwError(() => new Error(err)))
    );
  }
}
