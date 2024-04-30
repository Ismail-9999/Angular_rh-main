import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProsComponent } from './filter-pros.component';

describe('FilterProsComponent', () => {
  let component: FilterProsComponent;
  let fixture: ComponentFixture<FilterProsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterProsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterProsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
