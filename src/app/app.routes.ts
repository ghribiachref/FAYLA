import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ToastComponent } from './components/toast/toast.component';
import { OrderComponent } from './components/order/order.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
   { path: 'order', component: OrderComponent },
   { path: 'toast', component: ToastComponent },  // Cart page // Home is app.component.html
  { path: '**', redirectTo: '' }  // fallback to home
];
