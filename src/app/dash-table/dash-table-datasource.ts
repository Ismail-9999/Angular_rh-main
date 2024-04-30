import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, of, Subject } from 'rxjs';
import { Table1Service } from '../table1.service';

 /**
 * Data source for the DashTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DashTableDataSource extends DataSource<any[]> {
  paginator!: MatPaginator  ;
  sort!: MatSort  ;
  private refreshSubject = new Subject<void>();
  public paginatorAndSortSet = false;
  data : any[];  
 

  constructor(private pageservice : Table1Service ,private initialData: any[]) {
    super();
     
     this.data = initialData;
  }
 
  setPaginatorAndSort(paginator: MatPaginator, sort: MatSort): void {
    this.paginator = paginator;
    this.sort = sort;
    this.paginatorAndSortSet = true;
    this.connect(); // Call connect after setting paginator and sort
    this.refreshSubject.next();
  }
  refreshDataSource(): void {
    this.connect();
    this.refreshSubject.next();
  }
  connect(): Observable<any[]> {
    if (!this.paginator || !this.sort) {
      if (!this.paginatorAndSortSet) {
        console.log('Paginator or Sort not available during initial connect');
        return of([]);
      }
      
    }
  
    const initialLoad$ = of(null);
    const page$ = this.paginator.page.pipe(startWith({}));
    const sort$ = this.sort.sortChange.pipe(startWith({}));
  
   
    return merge(initialLoad$, page$, sort$).pipe(
      switchMap(() => this.pageservice.getPage(
        this.paginator.pageIndex * this.paginator.pageSize,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      )),
      
      catchError(() => of([])),  // Handle errors gracefully
      map((pageData) => pageData.content)
      
    );
  
   }

  disconnect(): void {
   /* this.refreshSubject.complete();
  */  }
}
 


