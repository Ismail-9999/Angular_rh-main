import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  // private apiUrl = 'https://back-end-rh.onrender.com/api/files'; // Replace with your actual backend API URL
  private apiUrl = 'http://localhost:8084/api/files';

  constructor(private http: HttpClient , private auth : AuthServiceService) {}

  uploadFile(file: File, prospectId: string): Observable<any> {
    const formData: FormData = new FormData();
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/savefile/${prospectId}`,formData, {headers} );
    
  }





}
