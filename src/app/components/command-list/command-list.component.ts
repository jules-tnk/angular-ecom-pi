import { Component, OnInit } from '@angular/core';
import {OrderFromApi} from "../../models/order";
import {OrderService} from "../../services/order/order.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {
  orders: OrderFromApi[] = [];


  constructor(private orderService: OrderService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrderFromApi();
  }


  getOrderFromApi(){
    if (!this.authService.isUserLoggedIn()){
      alert("You are not logged in");
      this.router.navigate(['/login'])
    }

    let userId: number = this.authService.getUserId();
    this.orderService.getOrderHistoryFromApi(userId).subscribe(
      ordersFromApi => {
        this.orders = ordersFromApi
      }
    )
  }


}
