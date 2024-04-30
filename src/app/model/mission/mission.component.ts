import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MissionDialogAddComponent } from '../../add-dialog/mission-dialog-add/mission-dialog-add.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {

  constructor(private http: HttpClient, private _dialog: MatDialog, private router: Router){}
  
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
    const dialogRef = this._dialog.open(MissionDialogAddComponent, {
      width: '900px',  
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle
      console.log('Dialog closed with result:', result);
     /* this.matTableComponent.notifyRefresh();*/
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["/mission"]);
      });
      
    });
  }

}
