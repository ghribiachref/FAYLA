import { Injectable } from '@angular/core';
import { Product } from '../Model/Product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push({...product});
    }
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(p => p.id !== id);
  }

  updateQuantity(id: number, qty: number) {
    const prod = this.cart.find(p => p.id === id);
    if (prod) prod.quantity = qty;
  }

  getTotal() {
    return this.cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }
}
