import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectDtlsComponent } from './prospect-dtls.component';

describe('ProspectDtlsComponent', () => {
  let component: ProspectDtlsComponent;
  let fixture: ComponentFixture<ProspectDtlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectDtlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectDtlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
