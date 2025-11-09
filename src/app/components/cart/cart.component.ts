import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(public cartService: CartService) {}

  increase(product: any) {
    product.quantity++;
    this.cartService.updateQuantity(product.id, product.quantity);
  }

  decrease(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.cartService.updateQuantity(product.id, product.quantity);
    }
  }

  remove(product: any) {
    this.cartService.removeFromCart(product.id);
  }
}
