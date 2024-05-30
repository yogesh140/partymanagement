import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrls: string = 'https://ap.greatfuturetechno.com/';
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  loginServices(loginObj: any) {
    return this.http.post<any>(`${this.apiUrls}login/`, loginObj);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
