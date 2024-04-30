import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-mission-dialog-add',
  templateUrl: './mission-dialog-add.component.html',
  styleUrl: './mission-dialog-add.component.scss',
})
export class MissionDialogAddComponent {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MissionDialogAddComponent>,
    private auth: AuthServiceService
  ) {}

  mission_ref: String = '';
  designation: String = '';
  lieuimput: String = '';
  entite: String = '';
  nombrej: number = 0;
  clientid: number = 0;

  mission: any;

  currentID = '';
  data: any;

  ngOnInit() {
    console.log('Mission data:', this.data);
  }

  register() {
    let bodyData = {
      mission_ref: this.mission_ref,
      designation: this.designation,
      lieuimput: this.lieuimput,
      entite: this.entite,
      nombrej: this.nombrej,
      client: {
        clientid: this.clientid,
      },
    };

    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    this.http
      // .post('https://back-end-rh.onrender.com/api/mission/add', bodyData, {
        .post('http://localhost:8084/api/mission/add', bodyData, {
        headers,
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.snackBar.open('Mission ajouter avec succès', 'Fermer', {
          duration: 3000,
        });
        this.dialogRef.close(bodyData);
      });
  }

  save() {
    if (this.currentID == '') {
      this.register();
    } else {
      console.log('Erreur insertion');
    }
  }

  close() {
    // Close the dialog
    this.dialogRef.close();
  }
}
