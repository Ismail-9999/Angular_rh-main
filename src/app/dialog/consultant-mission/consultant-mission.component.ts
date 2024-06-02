import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultantDataComponent } from '../../data/consultant-data/consultant-data.component';
import { environmentdev } from '../../../environments/environment.development';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-consultant-mission',
  templateUrl: './consultant-mission.component.html',
  styleUrl: './consultant-mission.component.scss',
})
export class ConsultantMissionComponent {
  consultantid: number = 0;
  missionid: number = 0;

  baseUrl =  environmentdev.baseUrl;
  //prodUrl = environment.prodUrl;
  
  consultantname: { consultantName: string } = { consultantName: '' };
  missionname: { Designation: string } = { Designation: '' };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConsultantDataComponent>,
    private http: HttpClient,
    private auth: AuthServiceService,
  ) {}

  ngOnInit() {
    //console.log('Received data in ConsultantMissionComponent:', this.data);
  }

  fetchMissiondes() {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    if (this.missionid) {
      // const apiUrl = `https://back-end-rh.onrender.com/api/mission/name/${this.missionid}`;

      //const apiUrl = `http://localhost:8084/api/mission/name/${this.missionid}`;

      //const apiUrl = `${this.prodUrl}api/mission/name/${this.missionid}`;

      const apiUrl = `${this.baseUrl}api/mission/name/${this.missionid}`;
      
      this.http.get<{ Designation: string }>(apiUrl,{headers}).subscribe({
        next: (response: { Designation: string }) => {
          this.missionname = response;
        },
        error: (error) => {
          console.error('Error:', error); // Log the error for debugging
          this.missionname = { Designation: 'Mission introuvable' };
        },
      });
    } else {
      this.missionname = { Designation: '' };
    }
  }

  addConsultantToSalarie(consultantId: number, missionId: number) {
    const requestBody = {
      consultantid: consultantId, // Make sure the parameter name matches
      missionid: missionId,
    };

    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    //console.log('Request Body:', requestBody); // Log the requestBody

    this.http
      // .post('https://back-end-rh.onrender.com/api/mission/add/cons-mis', requestBody)
      
      // .post(`${this.prodUrl}api/mission/add/cons-mis`, requestBody)

      .post(`${this.baseUrl}api/mission/add/cons-mis`, requestBody,{headers})
      .subscribe({
        next: (response) => {
          //console.log('Success:', response);
          const ConsultantID = requestBody.consultantid;
          this.dialogRef.close(ConsultantID);
        },
        error: (error) => {
          console.error('Error:', error); 
        },
      });
  }

  close(){
    this.dialogRef.close();
  }
}
