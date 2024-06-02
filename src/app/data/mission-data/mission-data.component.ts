import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { DataService } from '../../cache-data/dataService.service';

@Component({
  selector: 'app-mission-data',
  templateUrl: './mission-data.component.html',
  styleUrl: './mission-data.component.scss',
})
export class MissionDataComponent {
  displayedColumns = [
    'missionid',
    'mission_ref',
    'designation',
    'consultant',
    /*'lieuimput',*/
    /*'entite',*/
    'client',
    /*'nombrej'*/
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: MatInput;
  dataSource = new MatTableDataSource<any>();

  filter = new FormControl('');
  
  constructor(private http: HttpClient , 
    private auth:AuthServiceService, private dataService: DataService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllmission1();
    this.filter.valueChanges.subscribe((filterValue) => {
      filterValue = (filterValue ?? '').trim(); // Remove whitespace
      this.dataSource.filter = filterValue.toLowerCase();
    });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      // Check if this.dataSource is defined
      filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }

  MissionArray: any[] = [];

  getAllmission1() {
    this.dataService.getAllmission().subscribe((resudata: any) => {
      //console.log(resudata);
      this.MissionArray = resudata;
      this.dataSource = new MatTableDataSource(resudata);
      this.dataSource.paginator = this.paginator;
    });
  }

  // getAllmission() {
  //   const storedToken = localStorage.getItem('accessToken');
  //   this.auth.setAccessToken(storedToken);
  //     const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //   });
  //   this.http
  //     // .get('https://back-end-rh.onrender.com/api/mission/mission',{headers})
  //     .get('http://localhost:8084/api/mission/mission',{headers})
  //     .subscribe((resudata: any) => {
  //       console.log(resudata);
  //       this.MissionArray = resudata;
  //       this.dataSource = new MatTableDataSource(resudata);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }
}
