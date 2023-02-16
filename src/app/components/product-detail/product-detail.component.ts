import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product?: Product;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductFromApi();
  }

  getProductFromApi() {
    let id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductByIdFromApi(id).subscribe(
      (productFromApi) => {
        this.product = productFromApi;
      }
      )
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }



}
