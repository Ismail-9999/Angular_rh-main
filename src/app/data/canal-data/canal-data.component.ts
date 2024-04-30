import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { ProspectdetailsService } from '../../details-service/prospectdetails.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-canal-data',
  templateUrl: './canal-data.component.html',
  styleUrl: './canal-data.component.scss'
})
export class CanalDataComponent implements OnInit{

  displayedColumns: string[] = ['nom',
                                'pays',
                                'telephone',
                                'secteur',
                                'canal',
                                'canalInterlocuteur',
                                'action'];

 constructor( private http: HttpClient , private route: ActivatedRoute, public dialog: MatDialog , private prs: ProspectdetailsService,
              private auth: AuthServiceService
              ){

}
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
dataSource = new MatTableDataSource<any>();

ngOnInit(): void {
  // Exemple de données
  this.dataSource.data = [
    // { nom: 'John Doe', pays: 'France', telephone: '123456789', secteur: 'Technologie', canal: 'Email', canalInterlocuteur: 'Téléphone', action: '', statut: 'brouillon' },
    // { nom: 'Jane Smith', pays: 'USA', telephone: '987654321', secteur: 'Finance', canal: 'Téléphone', canalInterlocuteur: 'Email', action: '', statut: 'prospect' },
    // { nom: 'Alice Jones', pays: 'Canada', telephone: '55555555', secteur: 'Marketing', canal: 'Réseaux sociaux', canalInterlocuteur: 'Email', action: '', statut: 'consultant' },
    // { nom: 'John Doe', pays: 'France', telephone: '123456789', secteur: 'Technologie', canal: 'Email', canalInterlocuteur: 'Téléphone', action: '', statut: 'brouillon' },
    // { nom: 'Jane Smith', pays: 'USA', telephone: '987654321', secteur: 'Finance', canal: 'Téléphone', canalInterlocuteur: 'Email', action: '', statut: 'prospect' },
    // { nom: 'Alice Jones', pays: 'Canada', telephone: '55555555', secteur: 'Marketing', canal: 'Réseaux sociaux', canalInterlocuteur: 'Email', action: '', statut: 'consultant' },
    // { nom: 'John Doe', pays: 'France', telephone: '123456789', secteur: 'Technologie', canal: 'Email', canalInterlocuteur: 'Téléphone', action: '', statut: 'brouillon' },
    // { nom: 'Jane Smith', pays: 'USA', telephone: '987654321', secteur: 'Finance', canal: 'Téléphone', canalInterlocuteur: 'Email', action: '', statut: 'prospect' },
    // { nom: 'Alice Jones', pays: 'Canada', telephone: '55555555', secteur: 'Marketing', canal: 'Réseaux sociaux', canalInterlocuteur: 'Email', action: '', statut: 'consultant' },
    // { nom: 'John Doe', pays: 'France', telephone: '123456789', secteur: 'Technologie', canal: 'Email', canalInterlocuteur: 'Téléphone', action: '', statut: 'brouillon' },
    // { nom: 'Jane Smith', pays: 'USA', telephone: '987654321', secteur: 'Finance', canal: 'Téléphone', canalInterlocuteur: 'Email', action: '', statut: 'prospect' },
    // { nom: 'Alice Jones', pays: 'Canada', telephone: '55555555', secteur: 'Marketing', canal: 'Réseaux sociaux', canalInterlocuteur: 'Email', action: '', statut: 'consultant' },
    // Ajoutez d'autres lignes de données selon vos besoins
  ];
}

OpenEditDialog(id: any) {
  console.log("Ouverture du dialogue pour l'ID :", id);
}

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort ;
}

}
