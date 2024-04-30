import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDialogAddComponent } from './consultant-dialog-add.component';

describe('ConsultantDialogAddComponent', () => {
  let component: ConsultantDialogAddComponent;
  let fixture: ComponentFixture<ConsultantDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultantDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultantDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
