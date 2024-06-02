import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';
import { environmentdev } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultantdetailsService {

  // private baseUrl = 'https://back-end-rh.onrender.com/api';
  private baseUrl1 = 'http://localhost:8084/api';

  baseUrl = environmentdev.baseUrl;
 // prodUrl = environment.prodUrl;

  private cache: Map<number, any> = new Map(); 

constructor(private http: HttpClient , private auth:AuthServiceService)  { }

closeConsultant(consultantId : number) : Observable<string>  {

  const storedToken = localStorage.getItem('accessToken');
  this.auth.setAccessToken(storedToken);
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.auth.getAccessToken()}`,
  });

  // const url = `${this.prodUrl}api/consultant/close/${consultantId}` ;
  const url = `${this.baseUrl}api/consultant/close/${consultantId}` ;
  return this.http.request('PUT', url, {
    body: {},
    headers: headers,
    responseType: 'text'
  });
}

//new
reopenConsultant(consultantId: number) : Observable<string> {

  const storedToken = localStorage.getItem('accessToken');
  this.auth.setAccessToken(storedToken);
  const headers = new HttpHeaders ({
    Authorization : `Bearer ${this.auth.getAccessToken()}`,
  });

  // const url = `${this.prodUrl}api/consultant/reopen/${consultantId}`;
  const url = `${this.baseUrl}api/consultant/reopen/${consultantId}`;
  return this.http.request('PUT', url, {
    body:{},
    headers: headers,
    responseType : 'text'
  });
}

  getConsultantdetails(consultantid: number): Observable<any> {
  
    const cacheKey = consultantid.toString(); // Using consultant ID as cache key
    const cachedData = this.cache.get(consultantid);

    if (cachedData) {
      //console.log('Consultant details in cache', cachedData);
      return of(cachedData);
    }

    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    // const url = `${this.prodUrl}api/consultant/${consultantid}`; // Update the endpoint
    
    const url = `${this.baseUrl}api/consultant/${consultantid}`; // Update the endpoint

    return this.http.get(url, { headers }).pipe(
      tap((response) => {
        //console.log('Consultant details from API', response);
        this.cache.set(consultantid, response);
      }),
      catchError(this.handleError<any>('getConsultantdetails'))
    );
    }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed`, error);
      return of(result as T);
    };
  }
  
}
