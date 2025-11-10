// language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  // valeur par défaut 'en'
  private langSubject = new BehaviorSubject<'en' | 'ar'>('en');

  lang$ = this.langSubject.asObservable();

  setLanguage(lang: 'en' | 'ar') {
    this.langSubject.next(lang);
  }

  get currentLang() {
    return this.langSubject.value;
  }
}
