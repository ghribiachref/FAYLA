import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';
import { NotificationService } from '../../Services/notification.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   products = [
  { id: 1, name: 'TISSOT PRX', price: 69, quantity: 1, image: 'assets/images/tsb.png' },
  { id: 2, name: 'CASIO QUARTZ', price: 59, quantity: 1, image: 'assets/images/cs.png' },
  { id: 3, name: 'Guess women', price: 79, quantity: 1, image: 'assets/images/guess.png' },
];


  constructor(private cartService: CartService , private snackBar: MatSnackBar, private notificationService: NotificationService) {}

 addToCart(product: any) {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      image: product.image
    };

    this.cartService.addToCart(productToAdd);
    

    // ---- SMOOTH TOAST ----
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message: `${product.name} added to cart!` },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['success-toast']
    });
  }



}
