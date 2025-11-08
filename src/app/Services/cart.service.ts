import { Injectable } from '@angular/core';
import { Product } from '../Model/Product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  constructor() { }

  addToCart(product: Product) {
  // Find if the product already exists in the cart
  const existing = this.cart.find(p => p.id === product.id);

  if (existing) {
    // If exists, increase the quantity
    existing.quantity += product.quantity ?? 1; // default to 1 if quantity is undefined
  } else {
    // If not, add a new product with at least quantity 1
    this.cart.push({ ...product, quantity: product.quantity ?? 1 });
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
