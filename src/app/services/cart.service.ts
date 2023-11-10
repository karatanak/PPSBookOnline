import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [
    { id: 0, name: "Pizza Salami", price: 8.99, amount: 0 },
    { id: 1, name: "Pizza Classic", price: 5.49, amount: 0 },
    { id: 2, name: "Sliced Bread", price: 4.99, amount: 0 },
    { id: 3, name: "Salad", price: 6.99, amount: 0 },
  ];
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getProducts(): Product[] {
    return this.data;
  }

  getCart(): Product[] {
    console.log("this.cart: ", this.cart);
    return this.cart;
  }
  
  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  
  
  

}
