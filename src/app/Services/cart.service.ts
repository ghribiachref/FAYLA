import { Injectable } from '@angular/core';
import { Product } from '../Model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];
  private readonly STORAGE_KEY = 'user_cart'; // clé unique

  constructor() {
    this.loadCart(); // Charger au démarrage
  }

  // Charger le panier depuis localStorage
  private loadCart(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        this.cart = JSON.parse(data);
        // S'assurer que chaque produit a une quantité (au cas où)
        this.cart.forEach(item => {
          if (!item.quantity || item.quantity < 1) {
            item.quantity = 1;
          }
        });
      } catch (e) {
        console.error('Erreur lors du chargement du panier', e);
        this.cart = [];
      }
    }
  }

  // Sauvegarder dans localStorage
  private saveCart(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
  }

  // Ajouter au panier
  addToCart(product: Product): void {
    const existing = this.cart.find(p => p.id === product.id);

    if (existing) {
      existing.quantity += product.quantity ?? 1;
    } else {
      this.cart.push({ ...product, quantity: product.quantity ?? 1 });
    }

    this.saveCart(); // Sauvegarde après ajout
  }

  // Supprimer du panier
  removeFromCart(id: number): void {
    this.cart = this.cart.filter(p => p.id !== id);
    this.saveCart(); // Sauvegarde après suppression
  }

  // Mettre à jour la quantité
  updateQuantity(id: number, qty: number): void {
    const prod = this.cart.find(p => p.id === id);
    if (prod) {
      prod.quantity = qty > 0 ? qty : 1; // ne pas autoriser < 1
      if (qty <= 0) {
        this.removeFromCart(id); // optionnel : supprimer si qty = 0
      } else {
        this.saveCart(); // sauvegarde si quantité valide
      }
    }
  }

  // Calculer le total
  getTotal(): number {
    return this.cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  // Vider le panier (utile après commande)
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Obtenir une copie du panier (optionnel, pour éviter les mutations directes)
  getCart(): Product[] {
    return [...this.cart];
  }

  // cart.service.ts

getTotalItems(): number {
  return this.cart.reduce((sum, item) => sum + item.quantity, 0);
}
}
