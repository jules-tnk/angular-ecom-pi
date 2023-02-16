import { Component, OnInit } from '@angular/core';
import {Order} from "../../models/order";
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Order[] = [];
  modalDisplayStyle: string = "none";
  containerDisplayStyle: string = "block";

  constructor(private carService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cart = this.carService.getCart();
  }

  getTotalPrice() {
    return this.carService.getTotalPrice();
  }

  getTotalQuantity() {
    return this.carService.getCartProductNumber();
  }

  saveModificationToCart() {
    this.carService.updateCart(this.cart);
  }

  openPopup() {
    this.modalDisplayStyle = "block";
    this.containerDisplayStyle = "none";
  }

  closePopup() {
    this.modalDisplayStyle = "none";
    this.containerDisplayStyle = "block";
  }

  validateOrder() {
    this.carService.validateOrder();
    this.closePopup();
  }

  clearCart() {
    this.carService.clearCart();
    this.getCart();
  }
}
