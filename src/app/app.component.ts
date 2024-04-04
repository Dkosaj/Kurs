import { Component } from '@angular/core';

interface Kurs {
  nazwa: string;
  numer: number;
  imieINazwisko: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  zalogowany: boolean = false;
  pokazFormularzRejestracji: boolean = false;
  nazwaUzytkownika: string = '';
  aktualnieWybranyKurs: number = 0;

  formularzLogowania = {
    nazwaUzytkownika: '',
    haslo: ''
  };

  formularzRejestracji = {
    nazwaUzytkownika: '',
    haslo: ''
  };

  uzytkownicy: { nazwaUzytkownika: string, haslo: string }[] = [];
  
  kursy: Kurs[] = [
    { nazwa: 'Kurs 1', numer: 1, imieINazwisko: '' },
    { nazwa: 'Kurs 2', numer: 2, imieINazwisko: '' },
    { nazwa: 'Kurs 3', numer: 3, imieINazwisko: '' }
  ];
  zapisanyUczestnik: { imieINazwisko: string, numer: number } | null = null;

  zaloguj() {
    const uzytkownik = this.uzytkownicy.find(u => u.nazwaUzytkownika === this.formularzLogowania.nazwaUzytkownika && u.haslo === this.formularzLogowania.haslo);
    if (uzytkownik) {
      this.zalogowany = true;
      this.nazwaUzytkownika = uzytkownik.nazwaUzytkownika;
    } else {
      alert('Nieprawidłowa nazwa użytkownika lub hasło.');
    }
  }
  
  zapiszNaKurs(kurs: Kurs) {
    if (kurs.imieINazwisko.trim() === '') {
      alert('Proszę podać imię i nazwisko uczestnika.');
      return;
    }
  
    this.zapisanyUczestnik = {
      imieINazwisko: kurs.imieINazwisko,
      numer: kurs.numer
    };
    this.aktualnieWybranyKurs = kurs.numer;
  }

  zarejestruj() {
    if (!this.formularzRejestracji.nazwaUzytkownika || !this.formularzRejestracji.haslo || !this.isPasswordValid(this.formularzRejestracji.haslo)) {
      alert('Proszę uzupełnić poprawnie formularz rejestracyjny.');
      return;
    }

    const istniejacyUzytkownik = this.uzytkownicy.find(u => u.nazwaUzytkownika === this.formularzRejestracji.nazwaUzytkownika);
    if (istniejacyUzytkownik) {
      alert('Użytkownik o podanej nazwie już istnieje.');
      return;
    }

  this.uzytkownicy.push({ nazwaUzytkownika: this.formularzRejestracji.nazwaUzytkownika, haslo: this.formularzRejestracji.haslo });
  this.zalogowany = true;
  this.nazwaUzytkownika = this.formularzRejestracji.nazwaUzytkownika;
  }

  wyloguj() {
    this.zalogowany = false;
    this.nazwaUzytkownika = '';
    this.resetujFormularze();
    this.zapisanyUczestnik = null;
    this.aktualnieWybranyKurs = 0;
  }

  toggleFormularzRejestracji() {
    this.pokazFormularzRejestracji = !this.pokazFormularzRejestracji;
    this.resetujFormularze();
  }

  resetujFormularze() {
    this.formularzLogowania = {
      nazwaUzytkownika: '',
      haslo: ''
    };
    this.formularzRejestracji = {
      nazwaUzytkownika: '',
      haslo: ''
    };
  }

  isPasswordValid(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    return uppercaseRegex.test(password) && digitRegex.test(password);
  }
}