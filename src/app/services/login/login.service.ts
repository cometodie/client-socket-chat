import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  private _token: string = '';
  private _user: any = null;
  private helperJWT: JwtHelperService = null;
  private _url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient, private route: Router) {
    this.helperJWT = new JwtHelperService();
  }

  public isAuth(){
    if (localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') != null) {
      this.setToken(localStorage.getItem('token'));
      this._user = this.helperJWT.decodeToken(this._token);
      console.log(this._user);
      const helper = new JwtHelperService();
      const token = this.getToken;
      if (token) {
        helper.isTokenExpired(token)
          ? this.authorize().subscribe(
              (newToken: any) => {
                this.setToken(newToken.token);
                this.route.navigate(['/']);
              },
              error => {
                console.log(error);
              }
            )
          : this.route.navigate(['/']);
      }
    }
  }

  public setToken(token: string) {
    token = token.replace('"', '');
    this._token = token;
    localStorage.setItem('token', token);
  }

  public login(email, password) {
    return this.http.post(`${this._url}user/signin`, { email, password });
  }

  public authorize() {
    const token = this.getToken;
    return this.http.get(`${this._url}user/update-token?token=${token}`);
  }

  get isAuthorized(): boolean {
    return !!this._token;
  }

  get getToken(): string {
    return this._token;
  }
  
  get getUser(): any {
    return this._user ? this._user : this.helperJWT.decodeToken(this._token);
     
  }
}
