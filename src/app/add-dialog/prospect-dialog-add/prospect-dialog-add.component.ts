import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { environmentdev } from '../../../environments/environment.development';
import { DataService } from '../../cache-data/dataService.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from '../../login-page/login.service';

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
    private auth:AuthServiceService,
    public dataService: DataService,
    private fb : FormBuilder,
    private loginService : LoginService
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
  // anneeexperience: number = 0;
  anneeexperience: number | string = '';
  profession: string = '';
  email: string = '';
  sexe: string = '';
  disponibilite: string = '';
  experienceprofessionnelle: string = '';
  status: string = 'Prospect';
  motcle: string = '';
  majcv!: Date;
  certification: string = '';
  projetprofessionnel: string = '';


  baseUrl = environmentdev.baseUrl;
  //prodUrl = environment.prodUrl;

  prospectForm!: FormGroup;
  currentID = '';
  data: any;

  ngOnInit() {
    this.prospectForm = this.fb.group({
      nom: ['',[Validators.required, Validators.minLength(4)]],
      cin: [''],
      telephone:  [''],
      dateNaissance: [null],
      adresse: [''],
      formation: [''],
      secteuractivite: [''],
      competencemetier: [''],
      niveauacademique: [''],
      competencetechnique: [''],
      langue: [''],
      paysresidence: [''],
      anneeexperience: [''],
      profession: [''],
      email: [''], 
      sexe: [''],
      disponibilite: [''],
      experienceprofessionnelle: [''],
      status: ['Prospect'],
      motcle: [''],
      majcv: [null],
      certification: [''],
      projetprofessionnel: ['']
    });
    // console.log('Prospect data:', this.data);
  }

  register() {

    //new
    const userCreation = this.loginService.getUserCreation();
    const dateCreation = this.loginService.getDateCreation();

    //new
    let bodyData = {
      ...this.prospectForm.value,
      userCreation: userCreation,
      dateCreation: dateCreation
    };

    // let bodyData = this.prospectForm.value;

    // let bodyData = {
    //   nom :this.nom ,
    //   dateNaissance: this.dateNaissance,
    //   disponibilite: this.disponibilite,
    //   formation: this.formation,
    //   secteuractivite: this.secteuractivite,
    //   langue: this.langue,
    //   cin: this.cin,
    //   majcv: this.majcv,
    //   paysresidence: this.paysresidence,
    //   anneeexperience: this.anneeexperience,
    //   telephone: this.telephone,
    //   profession: this.profession,
    //   motcle: this.motcle,
    //   email: this.email,
    //   status: this.status,
    //   sexe: this.sexe,
    //   competencemetier: this.competencemetier,
    //   niveauacademique: this.niveauacademique,
    //   competencetechnique: this.competencetechnique,
    //   experienceprofessionnelle: this.experienceprofessionnelle,
    // };

    //console.log('Payload:', bodyData); // Log the payload

    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });
    

    this.http
      // .post('https://back-end-rh.onrender.com/api/prospect/add', bodyData, {

      //  .post(`${this.prodUrl}api/prospect/add`, bodyData, {

        .post(`${this.baseUrl}api/prospect/add`, bodyData, {
        headers,
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        //console.log(resultData);
        this.dataService.deleteCacheEntry('prospect');
        this.snackBar.open('Prospect ajouté avec succès', 'Fermer', {
          duration: 3000,
        });
        this.dialogRef.close(bodyData);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du prospect:', error);
        this.snackBar.open('Erreur lors de l\'ajout du prospect', 'Fermer', {
          duration: 3000,
        });
        
      }
    );
  }

  save() {
    if (this.currentID == '' ) {
      this.register();
    } else {
      // console.log('Erreur insertion');
    }
    //console.log(this.prospectForm.value);
  }

  

  
  close() {
    this.dialogRef.close();
  }
}
