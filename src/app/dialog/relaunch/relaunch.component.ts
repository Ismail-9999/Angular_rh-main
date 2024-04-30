import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-relaunch',
  templateUrl: './relaunch.component.html',
  styleUrl: './relaunch.component.scss'
})
export class RelaunchComponent {
  // private apiUrl = 'https://back-end-rh.onrender.com/api/prospect/update';
  private apiUrl = 'http://localhost:8084/api/prospect/update';

  constructor(
    public dialogRef: MatDialogRef<RelaunchComponent>,
    private http: HttpClient ,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar
  ){
    this.data.prospect;
  }
 

  //DATE FORMAT
  get formattedProspectDate(): string {
    return this.formatProspectDate(this.data.prospect.rl_majcv);
  }
  formatProspectDate(date : Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
 

  concatenateLeadingZero(value: string): void {
    // Concatenate the value with a leading zero
    this.data.prospect.telephone = '0' + value;
  }

  ngOninit(){
    this.data.prospect ;
    if(this.data.prospect){
    // console.log('Relaunch prospect', this.data.prospect)
  }else{
    // console.log('No data')
  }
  }

  

save(){
  const prospectData = {
    idtiers: this.data.prospect.idtiers,
    nom: this.data.prospect.nom,
    adresse: this.data.prospect.adresse,
    telephone: this.data.prospect.telephone,
    email: this.data.prospect.email,
    anneeexperience: this.data.prospect.anneeexperience,
    competencemetier: this.data.prospect.competencemetier,
    dateNaissance : this.data.prospect.dateNaissance,
    secteuractivite : this.data.prospect.secteuractivite,
    langue : this.data.prospect.langue ,
    paysresidence : this.data.prospect.paysresidence,
    majcv : this.data.prospect.majcv , 
    cin:this.data.prospect.cin ,
    motcle : this.data.prospect.motcle ,
    niveauacademique : this.data.prospect.niveauacademique ,
    experienceprofessionnelle : this.data.prospect.experienceprofessionnelle,
    formation : this.data.prospect.formation ,
    disponibilite : this.data.prospect.disponibilite ,
    competencetechnique :this.data.prospect.competencetechnique,
    status : this.data.prospect.status,
    rl_desc : this.data.prospect.rl_desc,
    rl_majcv:this.data.prospect.rl_majcv
  };

  this.http
  .put(this.apiUrl, prospectData, { responseType: 'text' })
  .subscribe({
    next: (response) => {
      // console.log('Prospect updated successfully:', response);
      this.data.parent.updateData(this.data.prospect);
      // console.log('Updated Prospect Data:', this.data.prospect);
      this.dialogRef.close(this.data.prospect);
      this.snackBar.open('Relance effectuée', 'Close', {
        duration: 3000,
      });
    },
    error: (error) => {
      console.error('Error updating prospect:', error);
    },
  });
}


close() {
  // Close the dialog
  this.dialogRef.close();
}
}
