import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.loginService.isAuthorized) {
      this.router.navigate(['/login']);
    }
    return this.loginService.isAuthorized;
  }
}
