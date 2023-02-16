import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(){
    this.getProductsFromApi()
  }

  getProductsFromApi(){
     this.productService.getProductsFromApi().subscribe(
       productsFromApi => {
         this.products = productsFromApi;
       }
     );
  }

}
