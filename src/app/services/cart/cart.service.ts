import { Injectable } from '@angular/core';
import {Product} from "../../models/product";
import {Order} from "../../models/order";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {OrderRequest, SingleOrderRequest} from "../../models/orderRequest";
import {AuthenticationService} from "../authentication/authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Order[] = [];

  constructor(private http: HttpClient,
              private authService: AuthenticationService,
              private router: Router) { }

  addToCart(product: Product) {
    this.loadOrderFromLocalStorage()
    if (this.cart.find(order => order.product.id === product.id)) {
      return;
    }

    const order: Order = {
      product: product,
      quantity: 1,
    }
    this.cart.push(order);
    this.saveOrderInLocalStorage();
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(order => order.product.id !== product.id);
    this.saveOrderInLocalStorage();
  }

  getCart() {
    this.loadOrderFromLocalStorage()
    return this.cart;
  }

  updateCart(cart: Order[]) {
    this.cart = cart;
    this.saveOrderInLocalStorage();
  }

  getTotalPrice() {
    this.loadOrderFromLocalStorage()
    return this.cart.reduce((acc, order) => acc + order.product.price * order.quantity, 0);
  }


  getCartProductNumber() {
    this.loadOrderFromLocalStorage()
    return this.cart.length;
  }

  saveOrderInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadOrderFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart);
    }
  }

  validateOrder() {
    if (!this.isUserAuthenticated()) {
      alert('You must be logged in to validate your order')
      this.router.navigate(['/login']);
      return;
    }

    if (this.isCartEmpty()) {
      alert('Your cart is empty')
      return;
    }

    let orderRequest: OrderRequest = {
      clientId: this.authService.getUserId(),
      orders: []
    };

    for (const order of this.cart) {
      let singleOrderRequest: SingleOrderRequest = {
        productId: order.product.id,
        quantity: order.quantity,
        totalPrice: order.product.price * order.quantity
      }
      orderRequest.orders.push(singleOrderRequest);
    }

    this.http.post<HttpResponse<any>>('http://localhost:8080/api/orders/create', orderRequest, {observe: "response"}).subscribe(
      response => {
        if (response.status === 201) {
          this.clearCart();
          this.router.navigate(['/orders']);
        }
      }
    );
  }


  isUserAuthenticated() {
    return this.authService.isUserLoggedIn();
  }

  isCartEmpty() {
    this.loadOrderFromLocalStorage();
    return this.cart.length === 0;
  }

  clearCart() {
    this.cart = [];
    this.saveOrderInLocalStorage();
  }

}
