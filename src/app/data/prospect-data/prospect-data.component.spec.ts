import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectDataComponent } from './prospect-data.component';

describe('ProspectDataComponent', () => {
  let component: ProspectDataComponent;
  let fixture: ComponentFixture<ProspectDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProspectDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProspectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
