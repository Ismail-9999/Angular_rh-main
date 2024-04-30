import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ProspectDialogAddComponent } from '../../add-dialog/prospect-dialog-add/prospect-dialog-add.component';
import { ProspectDataComponent } from '../../data/prospect-data/prospect-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prospect',
  templateUrl: './prospect.component.html',
  styleUrl: './prospect.component.scss',
})
export class ProspectComponent {
  constructor(private http: HttpClient, private _dialog: MatDialog, private router: Router)  {}

  @ViewChild(ProspectDataComponent) matTableComponent!: ProspectDataComponent;

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

  openDialog() {
    const dialogRef = this._dialog.open(ProspectDialogAddComponent, {
      width: '900px',  
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle
      console.log('Dialog closed with result:', result);
     /* this.matTableComponent.notifyRefresh();*/
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["/pros"]);
      });
      
    });
  }
}
