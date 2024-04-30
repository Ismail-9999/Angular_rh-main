import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectDialogComponent } from './prospect-dialog.component';

describe('ProspectDialogComponent', () => {
  let component: ProspectDialogComponent;
  let fixture: ComponentFixture<ProspectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
