import {Product} from "./product";

export interface Order {
  product: Product;
  quantity: number;
}

export interface OrderFromApi {
  date: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

}
