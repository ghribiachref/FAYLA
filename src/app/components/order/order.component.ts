import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart: any[] = [];
  total: number = 0;
  customer = {
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.total = this.cartService.getTotal();
  }

  // Formatage auto : 98 123 456 (max 8 chiffres)
  formatPhone(): void {
    const digits = this.customer.phone.replace(/\D/g, '').slice(0, 8);
    this.customer.phone = this.formatPhoneFromDigits(digits);
  }

  // Bloque le collage au-delà de 8 chiffres
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 8);
    this.customer.phone = this.formatPhoneFromDigits(pasted);
  }

  // Méthode helper pour formater
  private formatPhoneFromDigits(digits: string): string {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  // Compte les chiffres (sans / dans template)
  getPhoneDigitsCount(): number {
    return this.customer.phone.replace(/\D/g, '').length;
  }

  // Validation : EXACTEMENT 8 chiffres
  isFormValid(): boolean {
    return !!this.customer.firstName.trim() &&
           !!this.customer.lastName.trim() &&
           !!this.customer.address.trim() &&
           this.getPhoneDigitsCount() === 8;
  }

  sendOrder(): void {
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs. Le téléphone doit contenir exactement 8 chiffres.');
      return;
    }

    const products = this.cart.map(p => `${p.name} x ${p.quantity}`).join('\n');
    const deliveryFee = 7;
    const grandTotal = this.total + deliveryFee;
    const cleanPhone = this.customer.phone.replace(/\D/g, '');

    const message = `
Commande:
${products}

Livraison: ${deliveryFee} DT
Total: ${grandTotal} DT

Client:
Nom: ${this.customer.firstName.trim()} ${this.customer.lastName.trim()}
Adresse: ${this.customer.address.trim()}
Téléphone: ${cleanPhone}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://m.me/107485442450938?text=${encodedMessage}`, '_blank');

    // Optionnel : vider le panier
    // this.cartService.clearCart();
  }
}
