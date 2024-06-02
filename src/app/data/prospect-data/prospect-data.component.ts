import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConsultantDataComponent } from '../consultant-data/consultant-data.component';
import { Subscription, from, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { FileuploadService } from '../../Docserv/fileupload.service';
import { FilterProsComponent } from '../../dialog/filter-pros/filter-pros.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { DataService } from '../../cache-data/dataService.service';
import { environmentdev } from '../../../environments/environment.development';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';



@Component({
  selector: 'app-prospect-data',
  templateUrl: './prospect-data.component.html',
  styleUrl: './prospect-data.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProspectDataComponent {
  @Output() dataUpdated: EventEmitter<void> = new EventEmitter<void>();
  private subscription: Subscription | undefined;

  displayedColumns = [
    'idtiers',
    'nom',
    'status',
    'cin',
    'disponibilite',
    'profession',
    'action',
    'cs',
  ];


  ProspectArray: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('filterInput') filterInput!: MatInput;
  dataSource = new MatTableDataSource<any>(this.ProspectArray);

  // private cache: Map<string, any> = new Map();
  baseUrl = environmentdev.baseUrl;
  //prodUrl = environment.prodUrl;

  filter = new FormControl('');
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private router: Router,
    private _dialog: MatDialog,
    private auth: AuthServiceService,
    private dataService: DataService,
    private modalService: NgbModal

  ) {
    // this.getAllprospect();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllprospect1();

    this.filter.valueChanges.subscribe((filterValue) => {
      filterValue = (filterValue ?? '').trim(); // Remove whitespace
      this.dataSource.filter = filterValue.toLowerCase();
    });
  }

  applyFilter(filterValue: string) {
    if (this.dataSource || this.ProspectArray) {
      // Check if this.dataSource is defined
      filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
      this.ProspectArray.filter;
    }
  }
  getAllprospect1() {
    this.dataService.getAllprospect().subscribe((resudata: any) => {
      //console.log(resudata);
      this.ProspectArray = resudata;
      this.dataSource = new MatTableDataSource(resudata);
      this.dataSource.paginator = this.paginator;
    })
  }

  // getAllprospect() {
  //   const storedToken = localStorage.getItem('accessToken');
  //   this.auth.setAccessToken(storedToken);
  //     const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //   });
  //   this.http
  //     // .get('http://localhost:8080/api/prospect/prospect',{headers})
  //     .get('http://localhost:8084/api/prospect/prospect',{headers})
  //     .subscribe((resudata: any) => {
  //       // console.log(resudata);
  //       this.ProspectArray = resudata;
  //       this.dataSource = new MatTableDataSource(resudata);
  //       this.dataSource.paginator = this.paginator;
  //     });
  // }

  setDelete(data: any) {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      width : '600px',
      data : { message : `Êtes vous sûrs de vouloir supprimer ${data.nom} ?` }
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
        // 'https://back-end-rh.onrender.com/api/prospect/delete' + '/' + data.idtiers,
        //`${this.prodUrl}api/prospect/delete` + '/' + data.idtiers,
        `${this.baseUrl}api/prospect/delete` + '/' + data.idtiers,
        {
          headers,
          responseType: 'text'
        }
      )
      .subscribe((resultData: any) => {
        //console.log(resultData);
        this.dataService.deleteCacheEntry('prospect');
        this.snackBar.open('Prospect supprimé', 'Fermer', {
          duration: 3000,
        });
        this.getAllprospect1();
      });
      }
    })
 
  }

  //Méthode originale

  //   convertToConsultant(idtiers: number): void {

  //      // Enregistrer l'idtiers pour la conversion
  //     //  this.idtiersToConvert = idtiers;
  //       // Afficher uniquement le message d'alerte
  //       // this.showAlert = true;

  //      const confirmation = confirm("Êtes-vous sûr de vouloir convertir ce prospect en consultant ?");
  //     //  const statusP = ;
  //      if(confirmation ) {
  //     const storedToken = localStorage.getItem('accessToken');
  //     this.auth.setAccessToken(storedToken);
  //       const headers = new HttpHeaders({
  //       Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //     });
  //     // const url = `https://back-end-rh.onrender.com/prospect/convert/${idtiers}`;
  //     const url = `http://localhost:8084/api/prospect/convert/${idtiers}`;
  //     if (this.subscription) {
  //       this.subscription.unsubscribe();
  //     }

  //     this.subscription = this.http
  //       .post<ConsultantDataComponent>(url, {},{headers})
  //       .subscribe({
  //         next: (consultant: ConsultantDataComponent) => {
  //           console.log('Converted to consultant:', consultant);
  //           const consultantId = consultant.consultantid;
  //           this.router.navigate(['/consultant', consultantId]);
  //         },
  //         error: (error) => {
  //           // Handle errors
  //           console.error('Error converting to consultant:', error);
  //         },
  //       });
  //   } else {
  //      //Annuler la conversion
  //      console.log('Conversion annulée');
  //    }
  // }


  //------------CELLE QUI MARCHE-----------------//

  // convertToConsultant(idtiers: number): void {
  //   const storedToken = localStorage.getItem('accessToken');
  //   this.auth.setAccessToken(storedToken);
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.auth.getAccessToken()}`,
  //   });

  //   const url = `http://localhost:8084/api/prospect/convert/${idtiers}`;

  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }

  //   // Récupérer les détails du prospect
  //   this.http.get<any>('http://localhost:8084/api/prospect/' + idtiers, { headers }).subscribe({
  //     next: (prospect: any) => {
  //       const confirmation = confirm(`Êtes-vous sûr de vouloir convertir ${prospect.nom} en consultant ?`);

  //       if (confirmation) {
  //         if (prospect && prospect.status === 'Prospect') {
  //           // Procéder à la conversion si le statut est "Prospect"
  //           this.subscription = this.http.post<ConsultantDataComponent>(url, {}, { headers }).subscribe({
  //             next: (consultant: ConsultantDataComponent) => {
  //               //console.log('Converted to consultant:', consultant);
  //               const consultantId = consultant.consultantid;
  //               this.router.navigate(['/consultant', consultantId]);
  //             },
  //             error: (error) => {
  //               console.error('Error converting to consultant:', error);
  //             },
  //           });
  //         } else {
  //           // Afficher un message d'erreur si le statut n'est pas "Prospect"
  //           this.showConversionError(prospect.nom);
  //         }
  //       } else {
  //         //console.log('Conversion annulée');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error retrieving prospect details:', error);
  //     },
  //   });
  // }



  //------------------------------TEST CONVERT POPUP------------------------------------//


  convertToConsultant(idtiers: number): void {
    const storedToken = localStorage.getItem('accessToken');
    this.auth.setAccessToken(storedToken);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getAccessToken()}`,
    });

    const url = `http://localhost:8084/api/prospect/convert/${idtiers}`;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Récupérer les détails du prospect
    // this.http.get<any>(`${this.prodUrl}api/prospect` + idtiers, { headers }).subscribe({
      this.http.get<any>(`${this.baseUrl}api/prospect` + '/' + idtiers, { headers }).subscribe({
      next: (prospect: any) => {

        if (prospect && prospect.status === 'Consultant') {
          this.showConversionError(prospect.nom);
          return; // Arrêter l'exécution si le prospect est déjà un consultant
        }

        
        //console.log('prospect:', prospect);

        const dialogRef = this._dialog.open(ConfirmationModalComponent, {
          width: '600px',
          data: { message: `Êtes-vous sûr de vouloir convertir ${prospect.nom} en consultant ?` }
        });
        // Attendre le résultat du modal (confirmation ou annulation)
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'confirm') {
            // Envoyer la requête POST pour convertir le prospect en consultant
            if (prospect && prospect.status === 'Prospect') {
              this.subscription = this.http.post<ConsultantDataComponent>(
                // `${this.prodUrl}api/prospect/convert/${idtiers}`, {}, { headers }).subscribe({
                  `${this.baseUrl}api/prospect/convert/${idtiers}`, {}, { headers }).subscribe({
                next: (consultant: ConsultantDataComponent) => {
                  const consultantId = consultant.consultantid;

                  
                  //console.log('Conversion successful, consultantId:', consultantId);
                  // this.updateProspectStatus(idtiers, 'Consultant');
                  this.dataService.deleteCacheEntry('prospect');
                  this.router.navigate(['/consultant', consultantId]).then(() => {

                    //console.log('Navigated to consultant details page');
                   
                    //  this.router.navigate(['/pros']);
                    // window.location.reload();
                  });

                },
                error: (error) => {
                  console.error('Error converting to consultant:', error);
                },
              });
            } else {
              this.showConversionError(prospect.nom);
            }
          }
        });
      },
      error: (error) => {
        console.error('Error retrieving prospect details:', error);
      },
    });
  }
  //--------------------------------------FIN----------------------------------------------//
  // updateProspectStatus(idtiers: number, newStatus: string): void {
  //   // Mettre à jour le statut du prospect localement
  // }

  private showConversionError(consultantName: string): void {
    // alert(`${consultantName} est déjà un(e) consultant(e). Vous ne pouvez pas le / (la) convertir.`);

    const dialogRef = this._dialog.open(ErrorDialogComponent, { 
      width: '600px',
      data: { message: `${consultantName} est déjà un(e) consultant(e). Vous ne pouvez pas le / (la) convertir.` } 
    });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openFilterDialog(): void {
    const defaultStatusValue = '';
    const statusValues = ['Consultant', 'Prospect'];
    const defaultSecteurValues = ' ';
    const secteurValues = [
      'Corporate Banking',
      'Finance',
      'Banking',
      'Cash Management',
      'Monétique ',
      'Montage',
      'Opération et Backoffice ',
      'Risque',
      'Retail Banking ',
      'Gestion de projet ',
      'CRM',
      'Core Banking',
      'Paiement',
      'Contrôle',
    ];
    const defaultNiveauValue = '';
    const niveauValues = [
      'BAC+5',
      'BAC+3',
      'Master',
      'BAC+4',
      'BAC+2',
      'License',
    ];
    const defaultAnneexpValue = ' ';
    const anexpeienceValues = [12, 13, 6, 5, 16, 11, 5];
    const dialogRef = this._dialog.open(FilterProsComponent, {
      width: '900px',
      data: {
        displayedColumns: this.displayedColumns,
        columnFilters: {
          status: defaultStatusValue,
          secteuractivite: defaultSecteurValues,
          niveauacademique: defaultNiveauValue,
          anneeexperience: defaultAnneexpValue,
        },
        statusValues: statusValues,
        secteurValues: secteurValues,
        niveauValues: niveauValues,
        anexpeienceValues: anexpeienceValues,
      },
    });

    dialogRef.afterClosed().subscribe((selectedFilters) => {
      //console.log('filter', selectedFilters);
      if (selectedFilters) {
        this.applyFilters(selectedFilters);
      }
    });
  }

  applyFilters(selectedFilters: any): void {
    //console.log('Data before filter:', this.dataSource.data);
    if (this.dataSource) {
      const filterPredicate = this.createFilterPredicate(selectedFilters);
      this.dataSource.filterPredicate = filterPredicate;

      // Apply the filter only if at least one filter value is present
      if (Object.values(selectedFilters).some((value) => value !== '')) {
        //console.log('log 1', selectedFilters);
        this.dataSource.filter = 'applied'; // Set a dummy value to trigger the filter
      }
      else {
        // If no filters applied, clear the filter
        // this.dataSource.filter == null;
      }
    }

    //console.log('Data after filter:', this.dataSource.filteredData);
  }

  private createFilterPredicate(selectedFilters: any): (data: any) => boolean {
    return (data: any): boolean => {
      const statusFilter = selectedFilters.status?.toLowerCase() || '';
      const dataStatus = (data.status || '').toLowerCase();
      const secteurFiltre = selectedFilters.secteuractivite?.toLowerCase() || '';
      const dataSecteur = (data.secteuractivite || '').toLowerCase();
      const annexpFilter = selectedFilters.anneexperience?.toLowerCase() || '';
      const dataAnnexp = (data.anneexperience || '').toLowerCase();
      const niveauFilter = selectedFilters.niveauacademique?.toLowerCase() || '';
      const dataNiveau = (data.niveauacademique).toLowerCase();
      //console.log('createFilter data', statusFilter);
      return (
        (statusFilter === null || dataStatus.toLowerCase().includes(statusFilter)) &&
        (secteurFiltre === null || dataSecteur.toLowerCase().includes(secteurFiltre)) &&
        (annexpFilter === null || dataAnnexp.toLowerCase().includes(annexpFilter)) &&
        (niveauFilter === null || dataNiveau.toLowerCase().includes(niveauFilter))
      );
    };
  }


}
