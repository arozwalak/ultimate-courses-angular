import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_TOKEN } from './token';

@Injectable()
export class FoodService {
  constructor(
    private http: HttpClient,
    @Inject(API_TOKEN) private api: string
  ) {
    console.log(this.api);
  }
  getFood(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
