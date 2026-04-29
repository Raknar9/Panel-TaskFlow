import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkMode = signal(false);

  constructor() {

    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme) {
      this.darkMode.set(savedTheme === 'true');
    }

    effect(() => {

      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem(
        'darkMode',
        this.darkMode().toString()
      );

    });

  }

  toggleTheme() {
    this.darkMode.update(value => !value);
  }

}