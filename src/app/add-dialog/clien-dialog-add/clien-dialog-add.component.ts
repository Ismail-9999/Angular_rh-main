import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
 import { MatDialogRef } from '@angular/material/dialog';
import { environmentdev } from '../../../environments/environment.development';
import { DataService } from '../../cache-data/dataService.service';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-clien-dialog-add',
  templateUrl: './clien-dialog-add.component.html',
  styleUrl: './clien-dialog-add.component.scss',
})
export class ClienDialogAddComponent {
  clientname: String = '';
  client_add: String = '';
  client_ice: String = '';
  client : any ;
  currentid = '' ;
  data : any ;


  baseUrl =  environmentdev.baseUrl;
  
  //prodUrl = environment.prodUrl;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClienDialogAddComponent>,
    private dataService : DataService,
    private auth : AuthServiceService
  ) {}

  register(){
    let bodyData ={
      clientname: this.clientname,
      client_add: this.client_add ,
      client_ice : this.client_ice
    };

    const storedToken = localStorage.getItem('accessToken');
  this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${storedToken}`,
    });
    

    // this.http.post('https://back-end-rh.onrender.com/api/mission/add', bodyData ,{
    // this.http.post(`${this.prodUrl}api/mission/add`, bodyData ,{

      this.http.post(`${this.baseUrl}api/mission/add`, bodyData ,{
      responseType: 'text',
    }).subscribe((resudata : any)=>{
        //console.log(resudata);
        this.dataService.deleteCacheEntry('client');
        this.snackBar.open('Client ajouté avec succès','Fermer',{
          duration:3000,
        });
        this.dialogRef.close(bodyData);
    });
}

save(){
  if(this.currentid == ''){
      this.register();
  }else {
      //console.log('Erreur dinsertion')
  }
}


close() {
  // Close the dialog
  this.dialogRef.close();
}
}