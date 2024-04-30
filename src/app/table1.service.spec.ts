import { TestBed } from '@angular/core/testing';

import { Table1Service } from './table1.service';

describe('Table1Service', () => {
  let service: Table1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Table1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
