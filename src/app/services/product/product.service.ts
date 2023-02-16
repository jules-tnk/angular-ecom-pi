import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsFromApi(): Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:8080/api/products');
  }

  getProductByIdFromApi(id: number) {
    return this.http.get<Product>('http://localhost:8080/api/products/' + id);
  }
}
