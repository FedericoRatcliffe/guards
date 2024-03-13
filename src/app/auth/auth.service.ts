import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const AUTH_API = 'http://localhost:3000';

export interface Modelo {
  email: string;
  password: string;
}

interface AccessToken {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);
  

  login(data:Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(AUTH_API + '/auth/login', data).pipe(
      tap( (tokens:any) =>
        this.doLoginUser(data.email, JSON.stringify(tokens))
      )
    );
  }





  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }




  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }





  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }


  // 
  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }


  getCurrentAuthUser() {
    return this.http.get(AUTH_API+'/auth/usuarios');
  }
  





  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }







  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }







  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }
}
