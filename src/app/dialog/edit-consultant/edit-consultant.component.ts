import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultantComponent } from '../../model/consultant/consultant.component';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-edit-consultant',
  templateUrl: './edit-consultant.component.html',
  styleUrl: './edit-consultant.component.scss'
})
export class EditConsultantComponent {

  private apiUrl='http://localhost:8084/api/consultant/update';

  constructor(private http : HttpClient,
              private snackBar : MatSnackBar,
              private auth : AuthServiceService,
              private dialogRef : MatDialogRef<EditConsultantComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
              ){}

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

  //currentID = '';
  // data: any;


  ngOnInit() {
    console.log('Consultant data:', this.data.consultant);
  }

  save() : void {
    const consultantData={
      consultantid: this.data.consultant.consultantid,
      consultantname :this.data.consultant.consultantname,
      consultantcin :this.data.consultant.consultantcin,
      mobile : this.data.consultant.mobile,
      consultantbirthdate: this.data.consultant.consultantbirthdate,
      email: this.data.consultant.email,
      status : this.data.consultant.status,
      tjm: this.data.consultant.tjm,
      secteuractivite: this.data.consultant.secteuractivite,
      competencemetier: this.data.consultant.competencemetier,
      experiencepro: this.data.consultant.experiencepro,
    };

    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });

    this.http
    .put(this.apiUrl, consultantData, {responseType : 'text', headers})
    .subscribe({
      next: (response) =>{
        console.log('Consultant updated successfully:', response);
        this.data.parent.updateData(this.data.consultant);
        this.dialogRef.close(this.data.consultant);
        this.snackBar.open('Consultant mis à jour avec succès' , 'Close', {
          duration : 3000,
        });
      },
      error:(error) => {
        console.error('Error updating Consultant:', error)
      },
    });
 }

 close() {
  // Close the dialog
  this.dialogRef.close();
}
}
