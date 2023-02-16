import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";
import {CommandListComponent} from "./components/command-list/command-list.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'orders', component: CommandListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: '', redirectTo: 'products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
