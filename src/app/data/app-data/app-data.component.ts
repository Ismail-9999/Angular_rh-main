import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-app-data',
  templateUrl: './app-data.component.html',
  styleUrl: './app-data.component.scss'
})
export class AppDataComponent {

  displayedColumns = [
    'client',
    'd_administratif',
    'disponibilite',
    'consultant'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();


  AppOffreArray : any []= [] ;
  constructor(private http: HttpClient,private auth:AuthServiceService,
    private router : Router){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.getAllAppOffre();
  }

  goBack(): void {
    this.router.navigate(['/appo']);
  }

  

  getAllAppOffre (){
    console.log('Fetching data...');
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
      const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    this.http
    .get('http://localhost:8084/api/offres/show',{headers}).subscribe((resudata : any)=>{
      console.log('Data fetched successfully:', resudata);
      console.log(resudata);
      this.AppOffreArray = resudata ;
      this.dataSource = new MatTableDataSource(resudata);
      this.dataSource.paginator = this.paginator;
    }
    );
}

private breakpointObserver = inject(BreakpointObserver);
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,

          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,

        table: { cols: 4, rows: 4 },
      };
    })
  );


}
