import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environmentdev } from '../../../environments/environment.development';
import { DataService } from '../../cache-data/dataService.service';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPageComponent } from '../../login-page/login-page.component';
import { LoginService } from '../../login-page/login.service';

@Component({
  selector: 'app-consultant-dialog-add',
  templateUrl: './consultant-dialog-add.component.html',
  styleUrl: './consultant-dialog-add.component.scss'
})
export class ConsultantDialogAddComponent {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ConsultantDialogAddComponent>,
    public dataService: DataService,
    private auth : AuthServiceService,
    private fb : FormBuilder,
    private loginService : LoginService
  ) {}

  consultant : any ;
  consultantname:String = '';
  consultantcin:String ='';
  consultantbirthdate!: Date
  experiencepro:String ='';
  secteuractivite:String ='';
  email:String ='';
  competencemetier:String ='';
  mobile: number =0 ;
  tjm : number =0 ;
  status: string = 'Consultant';

  currentID = '';
  data: any;

  consultantForm! : FormGroup;
  baseUrl =  environmentdev.baseUrl;

  //prodUrl = environment.prodUrl;


  ngOnInit() {
    this.consultantForm = this.fb.group({
      consultantname: ['',[Validators.required, Validators.minLength(4)]],
      consultantcin: [''],
      consultantbirthdate: [null],
      experiencepro: [''],
      secteuractivite: [''],
      email: [''],
      competencemetier: [''],
      mobile: [0],
      tjm: [0,[Validators.required, Validators.min(0.01)]],
      status: ['Consultant']
    })
    //console.log('Consultant data:', this.data);
  }
  
 register() {
  
  //new
  const userCreation = this.loginService.getUserCreation();
  const dateCreation = this.loginService.getDateCreation();

  //new
  let bodyData = {
    ...this.consultantForm.value,
    userCreation : userCreation,
    dateCreation : dateCreation
  }

  // let bodyData = this.consultantForm.value;

  // let bodyData = {
  //   consultantname:this.consultantname ,
  //   consultantcin:this.consultantcin,
  //   consultantbirthdate: this.consultantbirthdate,
  //   experiencepro:this.experiencepro,
  //   secteuractivite: this.secteuractivite,
  //   email:this.email,
  //   competencemetier: this.competencemetier,
  //   mobile:this.mobile,
  //   tjm:this.tjm,
  //   status : this.status
  // };

  const storedToken = localStorage.getItem('accessToken');
  this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });
    
  this.http
    // .post('https://back-end-rh.onrender.com/api/consultant/add', bodyData, {

    //.post(`${this.prodUrl}api/consultant/add`, bodyData, { headers,
    
      .post(`${this.baseUrl}api/consultant/add`, bodyData, { headers,
      responseType: 'text',
    })
    .subscribe((resultData: any) => {
      //console.log(resultData);
      this.dataService.deleteCacheEntry('consultant');
      this.snackBar.open('Consultant ajouté avec succès', 'Fermer', {
        duration: 3000,
      });
      this.dialogRef.close(bodyData);
    });
}

save() {
  if (this.currentID == ''  ) {
    this.register();
  } else {
    //console.log('Erreur insertion');
  }
}


close() {
  // Close the dialog
  this.dialogRef.close();
}
}
