import { Component, ViewChild } from '@angular/core';
import { ConsultantdetailsService } from '../../details-service/consultantdetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ConsultantMissionComponent } from '../../dialog/consultant-mission/consultant-mission.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditConsultantComponent } from '../../dialog/edit-consultant/edit-consultant.component';

@Component({
  selector: 'app-consultant-dtls',
  templateUrl: './consultant-dtls.component.html',
  styleUrl: './consultant-dtls.component.scss',
})
export class ConsultantDtlsComponent {
  consultant: any;
  isSecondButton = true;   
  mission!: any;
  constructor(
    private route: ActivatedRoute,
    private cons: ConsultantdetailsService,
    private _dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    const ConsIdparam = this.route.snapshot.paramMap.get('id');
    if (ConsIdparam === null || ConsIdparam === undefined) {
      return console.log('error');
    }
    const consultantId = +ConsIdparam;

    this.cons.getConsultantdetails(consultantId).subscribe((data) => {
      if (data) {
        this.consultant = data;
      } else {
        console.error('Consultant data is undefined');
      }
    });
  }


  updateData(updatedData: any): void {
    // Update the parent component's data
    this.consultant = updatedData;
  }
  openDialog(consultant: any) {
    const dialogRef = this._dialog.open(ConsultantMissionComponent, {
      width: '900px',
      data: { parent: this, consultant },
    });

    dialogRef.afterClosed().subscribe((consultantID: number) => {
      console.log('Dialog closed with result:', consultantID);
      if(consultantID !== undefined && consultantID !== null){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/consultant', consultantID]);
      });}
      else{console.log('Dialog closed without consultantId')}
    });
  }
  openDialog2(){
    const dialogRef = this._dialog.open(EditConsultantComponent,{
      width: '900px',
      data:{
        parent: this, consultant:this.consultant
      }
    })
    dialogRef.afterClosed().subscribe(()=>
    {
      console.log("OK");
    })

    }

     openDialog3(){
    //   this.updateConsultantStatus();
     }
  

  goBack(): void {
    this.router.navigate(['/cons']);
  }

  getStatusClass(): string {
    if (this.consultant) {
      if (this.consultant.status === 'prospect') {
        return 'prospect';
      } else if (this.consultant.status === 'consultant') {
        return 'consultant';
      }
    }
    return ''; // Retourne une chaîne vide par défaut
  }

  // updateConsultantStatus(){
  //   if(this.consultant && this.consultant.status === 'consultant'){
  //     this.consultant.status = 'terminé';
  //   }
  // }
}
