import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  // private baseUrl = 'https://back-end-rh.onrender.com/api/prospect'; // Update with your Spring Boot backend URL
  // private baseUrl2 = 'https://back-end-rh.onrender.com/api/mission';
  private baseUrl = 'http://localhost:8084/api/prospect'; // Update with your Spring Boot backend URL
  private baseUrl2 = 'http://localhost:8084/api/mission';

  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  getProspectChartData(): Observable<any[]> {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    return this.http.get<any[]>(`${this.baseUrl}/chart`, { headers });
  }
  getProspectChartData2(): Observable<any[]> {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    return this.http.get<any[]>(`${this.baseUrl}/maj`,{headers});
  }

  getServicesDatda(): Observable<any[]> {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    return this.http.get<any[]>(`${this.baseUrl2}/msdata`,{headers});
  }

  getClientDatda(): Observable<any[]> {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    return this.http.get<any[]>(`${this.baseUrl2}/clidata`,{headers});
  }
}
