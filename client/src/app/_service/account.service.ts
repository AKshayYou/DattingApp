import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseURL = 'https://localhost:5001/api/';
  currentUser = signal<User | null>(null);


  login(model: any) {
    return this.http.post<User>(this.baseURL + 'Account/login', model).pipe(
      map(m => {
        if (m) {
          localStorage.setItem('user', JSON.stringify(m));
          this.currentUser.set(m);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  Register(model: any) {
    return this.http.post<User>(this.baseURL + 'Account/register', model).pipe(
      map(m => {
        if (m) {
          localStorage.setItem('user', JSON.stringify(m));
          this.currentUser.set(m);
        }
        return m;
      })
    );
  }
}
