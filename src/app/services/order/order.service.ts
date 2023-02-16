import { Injectable } from '@angular/core';
import {OrderFromApi} from "../../models/order";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderHistoryFromApi(clientId: number): Observable<OrderFromApi[]> {
    let fullUrl = "http://localhost:8080/api/orders/history/"+clientId;
    return this.http.get<OrderFromApi[]>(fullUrl)
  }
}
