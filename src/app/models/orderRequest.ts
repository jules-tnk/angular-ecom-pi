export interface SingleOrderRequest {
  productId: number;
  quantity: number;
  totalPrice: number;
}


export interface OrderRequest {
  clientId: number;
  orders: SingleOrderRequest[];
}
