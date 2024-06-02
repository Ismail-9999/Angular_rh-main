import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { MatInput } from '@angular/material/input';
import { DataService } from '../../cache-data/dataService.service';
import saveAs from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileuploadService } from '../../Docserv/fileupload.service';
import { environmentdev } from '../../../environments/environment.development';

@Component({
  selector: 'app-ged',
  templateUrl: './ged.component.html',
  styleUrl: './ged.component.scss',
})
export class GedComponent {
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

  displayedColumns = ['id', 'filename', 'prospectid','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: MatInput;
  dataSource = new MatTableDataSource<any>();

  baseUrl = environmentdev.baseUrl;
  //prodUrl = environment.prodUrl;

  
  selectedFile: File | null = null;
  files: any;
  name: any;
  constructor(private http: HttpClient, private auth: AuthServiceService,
              private dataService: DataService, private snackBar: MatSnackBar, private fileserv: FileuploadService,
    ) {}

  ngOnInit() {
    this.getAllfiles();
  }

  getAllfiles() {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });
    this.http
      // .get('https://back-end-rh.onrender.com/api/files/files', { headers })

      //.get(`${this.prodUrl}api/files/files`, { headers })

      .get(`${this.baseUrl}api/files/files`, { headers })
      .subscribe((resudata: any) => {
        this.files = resudata ;
        // this.files = resudata.map((file: any) => {
        //   return {
        //     ...file,
        //     prospectName: this.getProspectName(file.prospectId),
        //   };
        // });
        this.dataSource = new MatTableDataSource(resudata);
        this.dataSource.paginator = this.paginator;
        this.files.forEach((file: any) => {
          this.getProspectName(file.prospectId).subscribe((prospectName: string) => {
            file.prospectName = prospectName;
          });
        });
      });
  }
  //

  getProspectName(id: number) : Observable<string>{
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });

    return this.http
    // .get(`https://back-end-rh.onrender.com/api/prospect/nameID/${id}`, { headers, responseType: 'text' })

    // .get(`${this.prodUrl}api/prospect/nameID/${id}`, { headers, responseType: 'text' })
    
    .get(`${this.baseUrl}api/prospect/nameID/${id}`, { headers, responseType: 'text' })
    .pipe(
      map((data: string) => data),
      catchError((error: any) => {
        console.error('Error fetching prospect name:', error);
        return of('Unknown');
      })
    );
  }

  OnDownloadFile(fileName:string) : void {

    this.fileserv.downloadFile(fileName).subscribe((blob  =>{
      saveAs(blob, fileName);
      //console.log('File downloaded')
    })
    );

    // this.fileserv.downloadFile(this.files.fileName).subscribe(
    //   event => {
    //     console.log(event);
       
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error);
    //   }
    // );
    } 
  
  
  // downloadFile(prospectId: string): void {
  //   this.fileserv.downloadFile(prospectId).subscribe((data: Blob) => {
  //     const blob = new Blob([data], { type: 'application/octet-stream' });
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
      
  //     link.click();
  //   });
  // }

  //  downloadFile(prospectId : string) : void{
  //   this.fileserv.downloadFile(prospectId).subscribe((data: Blob) => {
  //     const blob = new Blob([data], { type: 'application/octet-stream' });
  //     const url = window.URL.createObjectURL(blob);
  //     window.open(url);
  //   }, error => {
  //     console.error('Failed to download file', error);
  //   });
  // }
  //  }
 
}
