import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // You can implement your authentication logic here.
    // For this example, we assume the user is logged in.
    // const isLoggedIn = true;

    if (localStorage.getItem('authoken')) {
      return true;
    } else {
      // If the user is not logged in, redirect them to the login page.
      this.router.navigate(['/login']);
      return false;
    }
  }
}
