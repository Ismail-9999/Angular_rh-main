import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { LoginService } from '../login-page/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthServiceService,
    private log: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('authGuard#canActivate called');
    const storedToken = localStorage.getItem('accessToken');
    // const acces =  this.authService.getAccessToken ;
    if (storedToken !== null) {
      // Token is present, user is authenticated
      console.log('User is authenticated', storedToken);
      console.log('is auth ' , this.authService.getAccessToken() )
      return true;
    } else {
      // Token is null, user is not authenticated
      console.log('Redirecting to login');
      return this.router.createUrlTree(['/login']);
    }
  }
}
