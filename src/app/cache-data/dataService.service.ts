import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cache: Map<string, any> = new Map();

  constructor(private http: HttpClient) { }

  //------------------------PARTIE CONSULTANT------------------------------//

  getAllconsultant1(): Observable<any> {
    const cacheKey = 'consultant';
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log('Data consultant in cache', parsedData);
        return of(parsedData);
      } catch (error) {
        console.error('Error parsing cached data:', error);
        this.cache.delete(cacheKey); // Clear cache if parsing fails
      }
    }

    const storedToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });

    return this.http.get<any>('http://localhost:8084/api/consultant/consultant', { headers }).pipe(
      tap((response) => {
        console.log('Data consultant in API', response);
        try {
          const responseData = JSON.stringify(response);
          this.cache.set(cacheKey, responseData);
        } catch (error) {
          console.error('Error stringifying API response:', error);
        }
      }),
      catchError(this.handleError<any>('getAllconsultant'))
    );
  }

            //------------------------PARTIE CLIENT------------------------------//

  getAllClient(): Observable<any> {
    const cacheKey = 'client';
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log('Data client in cache', parsedData);
        return of(parsedData);
      } catch (error) {
        console.error('Error parsing cached data:', error);
        this.cache.delete(cacheKey); // Clear cache if parsing fails
      }
    }

    const storedToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });

    return this.http.get<any>('http://localhost:8084/api/client/show', { headers }).pipe(
      tap((response) => {
        console.log('Data client in API', response);
        try {
          const responseData = JSON.stringify(response);
          this.cache.set(cacheKey, responseData);
        } catch (error) {
          console.error('Error stringifying API response:', error);
        }
      }),
      catchError(this.handleError<any>('getAllClient'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed`, error);
      return of(result as T);
    };
  }

  //------------------------PARTIE MISSION------------------------------//

  getAllmission() {
    const cacheKey = 'mission';
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log('Data mission in cache', parsedData);
        return of(parsedData);
      } catch (error) {
        console.error('Error parsing cached data:', error);
        this.cache.delete(cacheKey); // Clear cache if parsing fails
      }
    }

    const storedToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });

    return this.http.get<any>('http://localhost:8084/api/mission/mission', { headers }).pipe(
      tap((response) => {
        console.log('Data mission in API', response);
        try {
          const responseData = JSON.stringify(response);
          this.cache.set(cacheKey, responseData);
        } catch (error) {
          console.error('Error stringifying API response:', error);
        }
      }),
      catchError(this.handleError<any>('getAllmission'))
    );
    }

    //------------------------PARTIE PROSPECT------------------------------//

    getAllprospect() {
        const cacheKey = 'prospect';
        const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log('Data prospect in cache', parsedData);
        return of(parsedData);
      } catch (error) {
        console.error('Error parsing cached data:', error);
        this.cache.delete(cacheKey); // Clear cache if parsing fails
      }
    }

    const storedToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });

    return this.http.get<any>('http://localhost:8084/api/prospect/prospect', { headers }).pipe(
      tap((response) => {
        console.log('Data prospect in API', response);
        try {
          const responseData = JSON.stringify(response);
          this.cache.set(cacheKey, responseData);
        } catch (error) {
          console.error('Error stringifying API response:', error);
        }
      }),
      catchError(this.handleError<any>('getAllprospect'))
    );
      }

      //------------------------PARTIE DETAILS CONSULTANT------------------------------//





      //------------------------PARTIE DETAILS PROSPECT------------------------------//


      //------------------------PARTIE DETAILS GED------------------------------//
   
}