import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProspectdetailsService } from '../details-service/prospectdetails.service';
import { AuthServiceService } from '../Auth/auth-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../cache-data/dataService.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
 
  displayedColumns: string[] = ['nom', 'pays', 'telephone', 'secteur', 'canal', 'canalInterlocuteur', 'action'];

 
  
  constructor(  private http: HttpClient ,    
    private route: ActivatedRoute
    , public dialog: MatDialog ,
    private prs: ProspectdetailsService,
    private auth: AuthServiceService,
    private dataservice : DataService
    ){
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>(); 

  ngOnInit(): void {
     
      this.dataservice.getAllClient().subscribe(()=>{});
      this.dataservice.getAllconsultant1().subscribe(()=>{});
      this.dataservice.getAllmission().subscribe(()=>{});
      this.dataservice.getAllprospect().subscribe(()=>{});
  
  
    this.dataSource.data = [
      // { nom: 'John Doe', pays: 'France', telephone: '123456789', secteur: 'Technologie', canal: 'Email', canalInterlocuteur: 'Téléphone', action: '' },
      // { nom: 'Jane Smith', pays: 'USA', telephone: '987654321', secteur: 'Finance', canal: 'Téléphone', canalInterlocuteur: 'Email', action: '' },
      
    ];
  }
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );
 

  OpenEditDialog(id: any) {
    
    //console.log("Ouverture du dialogue pour l'ID :", id);
  }
}
