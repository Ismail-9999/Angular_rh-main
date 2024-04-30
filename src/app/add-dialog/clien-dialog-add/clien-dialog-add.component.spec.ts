import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienDialogAddComponent } from './clien-dialog-add.component';

describe('ClienDialogAddComponent', () => {
  let component: ClienDialogAddComponent;
  let fixture: ComponentFixture<ClienDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienDialogAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
