import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-prospect-dialog',
  templateUrl: './prospect-dialog.component.html',
  styleUrl: './prospect-dialog.component.scss',
})
export class ProspectDialogComponent {
  // private apiUrl = 'https://back-end-rh.onrender.com/api/prospect/update';
  private apiUrl = 'http://localhost:8084/api/prospect/update';

  constructor(
    public dialogRef: MatDialogRef<ProspectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private auth: AuthServiceService
  ) {
    this.data.prospect;
  }
  ngOnInit() {
    console.log('Prospect data:', this.data.prospect);
  }

  save(): void {
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
      status : this.data.prospect.status

      
    };

    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });

    this.http
      .put(this.apiUrl, prospectData, { responseType: 'text', headers})
      .subscribe({
        next: (response) => {
          console.log('Prospect updated successfully:', response);
          this.data.parent.updateData(this.data.prospect);
          // console.log('Updated Prospect Data:', this.data.prospect);
          this.dialogRef.close(this.data.prospect);
          this.snackBar.open('Prospect mis a jour avec succées', 'Close', {
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
