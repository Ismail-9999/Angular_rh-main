import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectDialogAddComponent } from './prospect-dialog-add.component';

describe('ProspectDialogAddComponent', () => {
  let component: ProspectDialogAddComponent;
  let fixture: ComponentFixture<ProspectDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
