import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultantDataComponent } from '../../data/consultant-data/consultant-data.component';

@Component({
  selector: 'app-consultant-mission',
  templateUrl: './consultant-mission.component.html',
  styleUrl: './consultant-mission.component.scss',
})
export class ConsultantMissionComponent {
  consultantid: number = 0;
  missionid: number = 0;
  consultantname: { consultantName: string } = { consultantName: '' };
  missionname: { Designation: string } = { Designation: '' };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConsultantDataComponent>,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('Received data in ConsultantMissionComponent:', this.data);
  }

  fetchMissiondes() {
    if (this.missionid) {
      // const apiUrl = `https://back-end-rh.onrender.com/api/mission/name/${this.missionid}`;
      const apiUrl = `http://localhost:8084/api/mission/name/${this.missionid}`;
      this.http.get<{ Designation: string }>(apiUrl).subscribe({
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

    console.log('Request Body:', requestBody); // Log the requestBody

    this.http
      // .post('https://back-end-rh.onrender.com/api/mission/add/cons-mis', requestBody)
      .post('http://localhost:8084/api/mission/add/cons-mis', requestBody)
      .subscribe({
        next: (response) => {
          console.log('Success:', response);
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
