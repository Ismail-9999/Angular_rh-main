import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDialogAddComponent } from './mission-dialog-add.component';

describe('MissionDialogAddComponent', () => {
  let component: MissionDialogAddComponent;
  let fixture: ComponentFixture<MissionDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissionDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissionDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
