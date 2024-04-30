import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProspectdetailsService {
  // private baseUrl = 'https://back-end-rh.onrender.com/api';
  private baseUrl = 'http://localhost:8084/api';

  private cache: Map<number, any> = new Map();

constructor(private http: HttpClient ,  private auth:AuthServiceService)  { }

  getProspectdetails(idtiers: number): Observable<any> {
  //   const storedToken = localStorage.getItem('accessToken');
  //   this.auth.setAccessToken(storedToken);
  //     const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //   });
  //   const url = `${this.baseUrl}/prospect/${idtiers}`; // Update the endpoint
  //   return this.http.get(url,{headers});
  // }
  const cacheKey = idtiers.toString();
  const cachedData = this.cache.get(idtiers);

  if (cachedData) {
    console.log('Prospect details in cache', cachedData);
    return of (cachedData);
  }

  const storedToken = localStorage.getItem('accessToken');
  this.auth.setAccessToken(storedToken);
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.auth.getAccessToken()}`,
  });
  const url = `${this.baseUrl}/prospect/${idtiers}`;

  return this.http.get(url, { headers}).pipe(
    tap((response) => {
      console.log('Prospect details from API', response);
      this.cache.set(idtiers, response);
    }),
    catchError(this.handleError<any>('getProspectdetails'))
  );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed`, error);
      return of(result as T);
    };
  }
}
