import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RelaunchComponent } from '../../dialog/relaunch/relaunch.component';
import { ActivatedRoute, Route } from '@angular/router';
import { ProspectdetailsService } from '../../details-service/prospectdetails.service';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-dash-data',
  templateUrl: './dash-data.component.html',
  styleUrl: './dash-data.component.scss'
})
export class DashDataComponent {
  displayedColumns = [
     'nom',
    'etat',
    'maj',
    'dispo',
    'desc', 'action'
  ];

  constructor(  private http: HttpClient ,    
    private route: ActivatedRoute
    , public dialog: MatDialog ,
    private prs: ProspectdetailsService,
    private auth: AuthServiceService
    ){
  
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

 
  ngOnInit (){
    console.log('This is the Data',this.getProsdata());
   
  }

//GET consultant by missions count 
  /*getdata(){
    this.http.get('http://localhost:8084/api/mission/dstab')
    .subscribe((resudata : any )=>{
      console.log(resudata);
      this.dataSource = new MatTableDataSource(resudata);
      this.dataSource.paginator = this.paginator;
    })

  }*/

///GET prospect data
getProsdata(){
  const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
  // this.http.get('https://back-end-rh.onrender.com/api/prospect/norelance',{headers})
  this.http.get('http://localhost:8084/api/prospect/norelance',{headers})
  .subscribe((resudata : any )=>{
    console.log(resudata);
    this.dataSource = new MatTableDataSource(resudata);
    this.dataSource.paginator = this.paginator;
    this.prospect = resudata ;
    this.data = resudata
  })

}

updateData(updatedData: any): void {
  // Update the parent component's data
  this.prospect = updatedData;
}


//Dialog de relance 
@Input() value: any;
prospect: any ;
data : any ;


OpenEditDialog(prospectId: number): void {
  const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
  // this.http.get(`https://back-end-rh.onrender.com/api/prospect/${prospectId}`,{headers})
  this.http.get(`http://localhost:8084/api/prospect/${prospectId}`,{headers})
  .subscribe((prospectData: any) => {
    const dialogRef = this.dialog.open(RelaunchComponent, {
      width: '900px',
      data: {parent:this, prospect: prospectData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prospect = result;
      }
    });
  });

 
}
}

 