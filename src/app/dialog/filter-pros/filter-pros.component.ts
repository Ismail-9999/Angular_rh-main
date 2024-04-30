import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-pros',
  templateUrl: './filter-pros.component.html',
  styleUrl: './filter-pros.component.scss'
})
export class FilterProsComponent {

  constructor(public dialogRef: MatDialogRef<FilterProsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

    onNoClick(): void {
      this.dialogRef.close();
    }

    
  applyFilter(): void {
    const selectedFilters = { ...this.data.columnFilters };
    this.dialogRef.close(selectedFilters);
  }

}
