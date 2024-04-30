import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private authservice: AuthServiceService
  ) {}

  username: string = '';
  email: string = '';
  roles: any;

  getUser(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    //return this.http.post('http://localhost:8080/auth/login', body.toString(), {
      return this.http.post('http://localhost:8084/auth/login', body.toString(), {
      headers,
    });
  }
// The login service API auth/login for autheticatio  

  getUser1(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(
      // 'https://back-end-rh.onrender.com/auth/login',
      'http://localhost:8084/auth/login',
      body.toString(),
      {
        headers,
      }
    );
  }

  loadProfile(data: any) {
    this.authservice.setAuthenticated(true);
    this.authservice.setAccessToken(data['access-token']);
    localStorage.setItem('accessToken', data['access-token']);
    this.authservice.getAccessToken();
    console.log('Token set to :', data['access-token']);
    let decodedJwt: any;
    try {
      decodedJwt = jwtDecode(data['access-token']);
      this.username = decodedJwt.sub;
      this.roles = decodedJwt.scope;
    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }
}
