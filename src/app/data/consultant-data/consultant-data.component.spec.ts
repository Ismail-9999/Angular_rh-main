import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDataComponent } from './consultant-data.component';

describe('ConsultantDataComponent', () => {
  let component: ConsultantDataComponent;
  let fixture: ComponentFixture<ConsultantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultantDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
