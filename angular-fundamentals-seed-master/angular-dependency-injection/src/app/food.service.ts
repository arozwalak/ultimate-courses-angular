import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FoodService {
  constructor(private http: HttpClient, @Inject('api') private api: string) {}
  getFood(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
