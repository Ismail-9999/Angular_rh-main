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
import { environmentdev } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private authservice: AuthServiceService
  ) {}

  userCreation: string='';
  dateCreation!: Date;
  username: string = '';
  email: string = '';
  roles: any;

  //prodUrl = environment.prodUrl;
  baseUrl = environmentdev.baseUrl;

  getUser(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    //return this.http.post('http://localhost:8080/auth/login', body.toString(), {

      // return this.http.post(`${this.prodUrl}auth/login`, body.toString(), {

      return this.http.post(`${this.baseUrl}auth/login`, body.toString(), {
      headers,
    });
  }
  
// The login service API auth/login for authetication  

  getUser1(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(
      // 'https://back-end-rh.onrender.com/auth/login',

      //`${this.prodUrl}auth/login`,

      `${this.baseUrl}auth/login`,
      
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
    //console.log('Token set to :', data['access-token']);
    let decodedJwt: any;
    try {
      decodedJwt = jwtDecode(data['access-token']);
      this.username = decodedJwt.sub;
      this.roles = decodedJwt.scope;


      //Sauvegarde local storage//
      //new
      localStorage.setItem('userCreation',   this.username);
      // localStorage.setItem('dateCreation',   this.username);

    } catch (error) {
      console.error('Error decoding JWT:', error);
    }
  }
  //new
  getUserCreation(): string {
    // return this.userCreation;
    const userCreation = localStorage.getItem('userCreation');
    //console.log("The user is",userCreation);
    return userCreation ? userCreation :  'defaultUser' ;
  }
  //new
  getDateCreation(): Date {
    // return this.dateCreation;
    return new Date();
  }
}
