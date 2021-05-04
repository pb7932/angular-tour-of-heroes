import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
         RouterStateSnapshot, UrlTree, Router,
         CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor ( private authService: AuthService,
                private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): true|UrlTree {
    if ( this.authService.isLoggedIn ) { return true; }

    this.authService.redirectUrl = url;

    return this.router.parseUrl('/login');
  }  
}