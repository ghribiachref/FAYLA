import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

private toastTrigger = new BehaviorSubject<string>('');
  toast$ = this.toastTrigger.asObservable();

  show(message: string) {
    this.toastTrigger.next(message);
  }
}
