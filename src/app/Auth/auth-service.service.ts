import { Injectable } from '@angular/core'; 
import { Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  constructor(private router: Router) {
    this.accessTokenSubject = new BehaviorSubject<string | null>(null);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  }

  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.getValue();
  }


  setAccessToken(token: string | null): void {
    this.accessTokenSubject.next(token);
  }

  logout(): void {
    console.log('Logging out...');
    this.setAuthenticated(false);
    this.setAccessToken(null);
    this.isAuthenticatedSubject.next(false);
    this.accessTokenSubject.next(null);
    localStorage.removeItem('accessToken');
    console.log('Logout complete.');
  }

  createLoginUrl(): UrlTree {
    return this.router.parseUrl('/login');
  }


}
