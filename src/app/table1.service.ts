import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Page } from './interface/page.interface';
import { environmentdev } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Table1Service {
  private apiUrl = 'http://localhost:8084/restapi/test';
  

  baseUrl = environmentdev.baseUrl;
  //prodUrl = environment.prodUrl;

  constructor(private http: HttpClient) { }

  getTestData(): Observable<any[]> {
    const url = `${this.apiUrl}/sp`;
    
    return this.http.get<any[]>(url);
  }

  getPage(page: number, pageSize: number,  activeSort: string, directionSort: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('activeSort', activeSort) // Add these lines for sorting parameters
    .set('directionSort', directionSort);

    //const url = `${this.prodUrl}restapi/test/page`;

    const url = `${this.baseUrl}restapi/test/page`;
    return this.http.get<Page<any>>(url, { params }).pipe(
      map(pageData => pageData.content),);
  }


  getCount(): Observable<number> {
   // const url = `${this.prodUrl}restapi/test/count`;
   
    const url = `${this.baseUrl}restapi/test/count`;
    return this.http.get<number>(url);
  }


  
}
