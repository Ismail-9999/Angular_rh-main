import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDtlsComponent } from './consultant-dtls.component';

describe('ConsultantDtlsComponent', () => {
  let component: ConsultantDtlsComponent;
  let fixture: ComponentFixture<ConsultantDtlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultantDtlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultantDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
