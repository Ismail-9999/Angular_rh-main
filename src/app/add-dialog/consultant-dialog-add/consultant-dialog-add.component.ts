import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consultant-dialog-add',
  templateUrl: './consultant-dialog-add.component.html',
  styleUrl: './consultant-dialog-add.component.scss'
})
export class ConsultantDialogAddComponent {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ConsultantDialogAddComponent>
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


  ngOnInit() {
    console.log('Consultant data:', this.data);
  }
  
 register() {
  let bodyData = {
    consultantname:this.consultantname ,
    consultantcin:this.consultantcin,
    consultantbirthdate: this.consultantbirthdate,
    experiencepro:this.experiencepro,
    secteuractivite: this.secteuractivite,
    email:this.email,
    competencemetier: this.competencemetier,
    mobile:this.mobile,
    tjm:this.tjm,
    status : this.status
  };

  this.http
    // .post('https://back-end-rh.onrender.com/api/consultant/add', bodyData, {
      .post('http://localhost:8084/api/consultant/add', bodyData, {
      responseType: 'text',
    })
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.snackBar.open('Consultant ajouter avec succès', 'Fermer', {
        duration: 3000,
      });
      this.dialogRef.close(bodyData);
    });
}

save() {
  if (this.currentID == ''  ) {
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
