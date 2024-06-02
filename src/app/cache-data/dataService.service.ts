import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environmentdev } from '../../environments/environment.development';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl = environmentdev.baseUrl ; 
    //prodUrl = environment.prodUrl;

  private cache: Map<string, any> = new Map();
  

  constructor(private http: HttpClient) { }

  deleteCacheEntry(key: string) {
    this.cache.delete(key);
  }

  //------------------------PARTIE CONSULTANT------------------------------//

  getAllconsultant1(): Observable<any> {
    const cacheKey = 'consultant';
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        //console.log('Data consultant in cache', parsedData);
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

    //return this.http.get<any>(`${this.prodUrl}api/consultant/consultant`, { headers }).pipe(
    return this.http.get<any>(`${this.baseUrl}api/consultant/consultant`, { headers }).pipe(
      tap((response) => {
        //console.log('Data consultant in API', response);
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
        //console.log('Data client in cache', parsedData);
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

    // return this.http.get<any>(`${this.prodUrl}api/client/show`, { headers }).pipe(
      return this.http.get<any>(`${this.baseUrl}api/client/show`, { headers }).pipe(
      tap((response) => {
        //console.log('Data client in API', response);
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
        //console.log('Data mission in cache', parsedData);
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

    // return this.http.get<any>(`${this.prodUrl}api/mission/mission`, { headers }).pipe(
      return this.http.get<any>(`${this.baseUrl}api/mission/mission`, { headers }).pipe(
      tap((response) => {
        //console.log('Data mission in API', response);
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
        //console.log('Data prospect in cache', parsedData);
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

    // return this.http.get<any>(`${this.prodUrl}api/prospect/prospect`, { headers }).pipe(
      return this.http.get<any>(`${this.baseUrl}api/prospect/prospect`, { headers }).pipe(
      tap((response) => {
        //console.log('Data prospect in API', response);
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
   
      //------------------------PARTIE ERREUR VALIDATEURS------------------------------//
      getErrorMessage(fieldName: string, error: ValidationErrors | null) : string{

        if(error == null) {
          return '';
        }
        if(error['required']) {
          return fieldName + " est obligatoire";
        } else if (error['minlength']){
          return fieldName+" doit avoir au moins " + error['minlength']['requiredLength']+ " caractères";
        } else if (error['min']) {
          return `${fieldName} doit être supérieur à ${error['min'].min}`;
        } else {
          return "";
        } 
      }
}