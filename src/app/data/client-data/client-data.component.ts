import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { MatInput } from '@angular/material/input';
import { DataService } from '../../cache-data/dataService.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrl: './client-data.component.scss'
})
export class ClientDataComponent {
  displayedColumns = [
    'idclient',
    'nom',
    'ice',
    'adresse'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: MatInput;
  dataSource = new MatTableDataSource<any>();


  client : any   ;
  ClientArray : any []= [] ;
  filter = new FormControl('');
  
  constructor(private http: HttpClient , private auth:AuthServiceService, private dataService: DataService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.getAllClient1();
     this.filter.valueChanges.subscribe((filterValue) => {
       filterValue = (filterValue ?? '').trim(); // Remove whitespace
       this.dataSource.filter = filterValue.toLowerCase();
     });
  }

  getAllClient1 (){
    this.dataService.getAllClient().subscribe((resudata: any) => {
      console.log(resudata);
      this.ClientArray =resudata;
      this.dataSource = new MatTableDataSource(resudata);
      this.dataSource.paginator = this.paginator;
    })
  }


  // getAllClient (){
  //   const storedToken = localStorage.getItem('accessToken');
  //   this.auth.setAccessToken(storedToken);
  //     const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //   });
  //     this.http
  //     //.get('https://back-end-rh.onrender.com/api/client/show',{headers})
  //     .get('http://localhost:8084/api/client/show',{headers})
  //     .subscribe((resudata : any)=>{
  //       console.log(resudata);
  //       this.ClientArray = resudata ;
  //       this.dataSource = new MatTableDataSource(resudata);
  //       this.dataSource.paginator = this.paginator;
  //     })
  // }

}
