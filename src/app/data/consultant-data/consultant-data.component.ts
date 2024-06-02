import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultantMissionComponent } from '../../dialog/consultant-mission/consultant-mission.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultantdetailsService } from '../../details-service/consultantdetails.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { DataService } from '../../cache-data/dataService.service';
import {  environmentdev } from '../../../environments/environment.development';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-consultant-data',
  templateUrl: './consultant-data.component.html',
  styleUrl: './consultant-data.component.scss',
})
export class ConsultantDataComponent {
  displayedColumns = [
    'idtiers',
    'nom',
    'adresse',
    'cin',
    'profession',
    'ss',
    'action',
    'mis',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: MatInput;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private http: HttpClient,
    private _dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cons: ConsultantdetailsService, 
    private auth:AuthServiceService,
    private router: Router,
    private dataService: DataService
  ) {}

  consultantid: number = 0;
  consultant: any;
  filter = new FormControl('');

  baseUrl= environmentdev.baseUrl;
  //prodUrl = environment.prodUrl;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.ConsultantArray ;
  }

  ngAfterViewChecked() {
    //console.log('Change detection ran');
  }
  ngOnInit() {
    //console.log('ngOnInit called');
    this.getAllconsultant1();
    this.filter.valueChanges.subscribe((filterValue) => {
      filterValue = (filterValue ?? '').trim(); // Remove whitespace
      this.dataSource.filter = filterValue.toLowerCase();
    });
  }

  ConsultantArray: any[] = [];

  getAllconsultant1() {
    //console.log('Fetching consultant data...');
  this.dataService.getAllconsultant1().subscribe((resudata: any) => {
    //console.log('Consultant data received:', resudata);

      //console.log(resudata);
      this.ConsultantArray = resudata;
      this.dataSource.data = this.ConsultantArray ;
      // this.dataSource = new MatTableDataSource(resudata);
      this.dataSource.paginator = this.paginator;
   
    });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      // Check if this.dataSource is defined
      filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }

  setDelete(data: any) {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width : '600px',
      data : { message : `Êtes vous sûrs de vouloir supprimer ${data.consultantname} ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const storedToken = localStorage.getItem('accessToken');
        this.auth.setAccessToken(storedToken);
        const headers = new HttpHeaders({
        Authorization: `Bearer ${storedToken}`,
    });

    this.http
      .delete(
        // 'https://back-end-rh.onrender.com/api/consultant/delete' + '/' + data.consultantid,
        // `${this.prodUrl}api/consultant/delete` + '/' + data.consultantid,
        `${this.baseUrl}api/consultant/delete` + '/' + data.consultantid,
        { headers,
          responseType: 'text' }
      )
      .subscribe((resultData: any) => {
        //console.log(resultData);
        this.dataService.deleteCacheEntry('consultant');
        this.snackBar.open('Consultant supprimé', 'Fermer', {
          duration: 3000,
        });
        this.getAllconsultant1();
      });
      }
    });
    
  }

  openDialog(consultant: any) {
    const dialogRef = this._dialog.open(ConsultantMissionComponent, {
      width: '900px',
      data: { parent: this, consultant },
    });

    dialogRef.afterClosed().subscribe((consultantID: number) => {
      //console.log('Dialog closed with result:', consultantID);
      if (consultantID !== undefined && consultantID !== null) {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/consultant', consultantID]);
          });
      } else {
        //console.log('Dialog closed without consultantId');
      }
    });
  }
}



 // getAllconsultant() {
  //   const storedToken = localStorage.getItem('accessToken');
  //   this.auth.setAccessToken(storedToken);
  //     const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //   });
  //   this.http
  //     //.get('https://back-end-rh.onrender.com/api/consultant/consultant',{headers})
  //     .get('http://localhost:8084/api/consultant/consultant',{headers})
  //     .subscribe((resudata: any) => {
  //       console.log(resudata);
  //       this.ConsultantArray = resudata;
  //       this.dataSource = new MatTableDataSource(resudata);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }