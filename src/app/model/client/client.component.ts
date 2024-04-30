import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ClienDialogAddComponent } from '../../add-dialog/clien-dialog-add/clien-dialog-add.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

  constructor (
    private _dialog: MatDialog, 
    private router : Router
  ){}

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
    const dialogRef = this._dialog.open(ClienDialogAddComponent, {
      width: '900px',  
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle
      console.log('Dialog closed with result:', result);
     /* this.matTableComponent.notifyRefresh();*/
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["/client"]);
      });
      
    });
  }

}
