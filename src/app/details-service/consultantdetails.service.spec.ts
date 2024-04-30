import { TestBed } from '@angular/core/testing';

import { ConsultantdetailsService } from './consultantdetails.service';

describe('ConsultantdetailsService', () => {
  let service: ConsultantdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultantdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
