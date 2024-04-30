import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DashTableDataSource } from './dash-table-datasource';
import { Table1Service } from '../table1.service';

@Component({
  selector: 'app-dash-table',
  templateUrl: './dash-table.component.html',
  styleUrls: ['./dash-table.component.scss']
})
export class DashTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild(MatSort) sort!: MatSort;
  dataLength!: number;
  datasource!: DashTableDataSource;
  data: any[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "featuers","featuersid","description" ];

  constructor(private pageservice: Table1Service) {  this.data = [];}
  
  ngAfterViewInit() {
    this.datasource.paginator =this.paginator;
    this.datasource.sort =this.sort;
    // Check if MatPaginator and MatSort are available
    if (this.paginator && this.sort) {
      if (this.datasource) {
        this.datasource.setPaginatorAndSort(this.paginator, this.sort);
      }
    } else {
      console.log('MatPaginator or MatSort not available yet');
    }
  }
  ngOnInit() {
    this.pageservice.getTestData().subscribe((data: any[]) => {
      console.log('Received data:', data);
      this.data = data;
      this.datasource = new DashTableDataSource(this.pageservice, this.data);
     

      if (this.paginator && this.sort) {
        this.datasource.setPaginatorAndSort(this.paginator, this.sort);
      } else {
        console.log('Paginator or Sort not available');
      }
    });

    this.pageservice.getCount().subscribe({
      next: pageCount => {
        console.log('Received pageCount:', pageCount);
        this.dataLength = pageCount;
      },
    });
  }

 
}
