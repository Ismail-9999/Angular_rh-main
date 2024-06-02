import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';
import { environmentdev } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  // private apiUrl = 'https://back-end-rh.onrender.com/api/files'; // Replace with your actual backend API URL
  private apiUrl = 'http://localhost:8084/api/files';

  //baseUrl = environment.baseUrl;

  //prodUrl = environment.prodUrl;

  baseUrl = environmentdev.baseUrl;

  constructor(private http: HttpClient , private auth : AuthServiceService) {}

  uploadFile(file: File, prospectId: string): Observable<any> {
    const formData: FormData = new FormData();
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    formData.append('file', file, file.name);

    // return this.http.post(`${this.apiUrl}/savefile/${prospectId}`,formData, {headers} );

    //return this.http.post(`${this.prodUrl}api/files/savefile/${prospectId}`,formData, {headers} );

    return this.http.post(`${this.baseUrl}api/files/savefile/${prospectId}`,formData, {headers} );
    
  }

  downloadFile(filename: string) : Observable<Blob> {
    const formData: FormData = new FormData();
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    
    // return this.http.get(`${this.apiUrl}/download/${filename}`,

    //return this.http.get(`${this.prodUrl}api/files/download/${filename}`,

    return this.http.get(`${this.baseUrl}api/files/download/${filename}`,
     {responseType: 'blob',
    headers});
  }
  
  // downloadFile(prospectId: string): Observable<Blob> {
  //   const storedToken = localStorage.getItem('accessToken');
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${storedToken}`,
  //   });

  //   return this.http.get(`${this.apiUrl}/download/${prospectId}`, {
  //     headers: headers,
  //     responseType: 'blob'
  //   });
  // }





}
