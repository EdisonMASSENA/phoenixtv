import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class TokenService {

  private TOKEN_KEY = 'auth-token';
  private USER_KEY = 'auth-user';

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user:any): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(){
    return JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
  }

}
