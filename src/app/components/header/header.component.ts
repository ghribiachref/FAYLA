import { Component, importProvidersFrom, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../Services/notification.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../Services/language.service';





declare var bootstrap: any;

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule , FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {


  private toastEl: any;
  private toast: any;
  private sub!: Subscription;

  constructor(
    public cartService: CartService,
    private notificationService: NotificationService,
    public languageService: LanguageService

  ) {}

  ngOnInit() {
    // Initialiser le toast Bootstrap
    this.toastEl = document.getElementById('addToCartToast');
    this.toast = new bootstrap.Toast(this.toastEl, { delay: 2000 });

    // Écouter les notifications
    this.sub = this.notificationService.toast$.subscribe(message => {
      if (message) {
        const toastBody = this.toastEl.querySelector('.toast-body');
        toastBody.innerHTML = `<strong>${message}</strong>`;
        this.toast.show();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  setLang(lang: 'en' | 'ar') {
    this.languageService.setLanguage(lang);
  }

}
