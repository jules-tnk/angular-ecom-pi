import { Component, OnInit } from '@angular/core';
import {CartService} from "../services/cart/cart.service";
import {AuthenticationService} from "../services/authentication/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cartService: CartService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  getCartProductNumber() {
    return this.cartService.getCartProductNumber();
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  getUserEmail() {
    return this.authService.getUserEmail();
  }

  logout() {
    this.authService.logout();
  }
}
