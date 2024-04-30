import { TestBed } from '@angular/core/testing';

import { ProspectdetailsService } from './prospectdetails.service';

describe('ProspectdetailsService', () => {
  let service: ProspectdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProspectdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
