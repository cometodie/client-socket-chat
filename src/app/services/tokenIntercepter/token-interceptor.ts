import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public loginService: LoginService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken}`
      }
    });
    return next.handle(request).catch((err: HttpErrorResponse): Observable<any> => {
      if (err.status == 401 || err.status == 403) {
        this.loginService.isAuth();
      }
      return Observable.throw(err);
    });
  }
}
