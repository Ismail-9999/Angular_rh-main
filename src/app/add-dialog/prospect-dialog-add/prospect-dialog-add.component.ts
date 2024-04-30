import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-prospect-dialog-add',
  templateUrl: './prospect-dialog-add.component.html',
  styleUrl: './prospect-dialog-add.component.scss',
})
export class ProspectDialogAddComponent {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProspectDialogAddComponent> , 
    private auth:AuthServiceService
  ) {}
  prospect: any;
  nom: string = '';
  cin: string = '';
  telephone: number = 0;
  dateNaissance!: Date;
  adresse: string = '';
  formation: string = '';
  secteuractivite: string = '';
  competencemetier: string = '';
  niveauacademique: string = '';
  competencetechnique: string = '';
  langue: string = '';
  paysresidence: string = '';
  anneeexperience: number = 0;
  profession: string = '';
  email: string = '';
  sexe: string = '';
  disponibilite: string = '';
  experienceprofessionnelle: string = '';
  status: string = 'Prospect';
  motcle: string = '';
  majcv!: Date;

  currentID = '';
  data: any;

  ngOnInit() {
    // console.log('Prospect data:', this.data);
  }

  register() {
    let bodyData = {
      nom :this.nom ,
      dateNaissance: this.dateNaissance,
      disponibilite: this.disponibilite,
      formation: this.formation,
      secteuractivite: this.secteuractivite,
      langue: this.langue,
      cin: this.cin,
      majcv: this.majcv,
      paysresidence: this.paysresidence,
      anneeexperience: this.anneeexperience,
      telephone: this.telephone,
      profession: this.profession,
      motcle: this.motcle,
      email: this.email,
      status: this.status,
      sexe: this.sexe,
      competencemetier: this.competencemetier,
      niveauacademique: this.niveauacademique,
      competencetechnique: this.competencetechnique,
      experienceprofessionnelle: this.experienceprofessionnelle,
    };


    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    this.http
      // .post('https://back-end-rh.onrender.com/api/prospect/add', bodyData, {
        .post('http://localhost:8084/api/prospect/add', bodyData, {
        headers,
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.snackBar.open('Prospect Ajouter avec succées', 'Close', {
          duration: 3000,
        });
        this.dialogRef.close(bodyData);
      });
  }

  save() {
    if (this.currentID == '' || this.nom == '') {
      this.register();
    } else {
      console.log('Erreur insertion');
    }
  }


  
  close() {
    this.dialogRef.close();
  }
}
