import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDataComponent } from './dash-data.component';

describe('DashDataComponent', () => {
  let component: DashDataComponent;
  let fixture: ComponentFixture<DashDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
