import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
   standalone: true,   // important if standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(public cartService: CartService) {
    // Example products
    this.cartService.addToCart({id:1,name:'Product 1',price:49,quantity:1,image:'assets/images/product-1.png'});
    this.cartService.addToCart({id:2,name:'Product 2',price:59,quantity:2,image:'assets/images/product-2.png'});
  }

  increase(product: any) {
    product.quantity++;
    this.cartService.updateQuantity(product.id, product.quantity);
  }

  decrease(product: any) {
    if (product.quantity > 1) product.quantity--;
    this.cartService.updateQuantity(product.id, product.quantity);
  }

  remove(product: any) {
    this.cartService.removeFromCart(product.id);
  }
}
