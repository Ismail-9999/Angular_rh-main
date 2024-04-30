import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalDataComponent } from './canal-data.component';

describe('CanalDataComponent', () => {
  let component: CanalDataComponent;
  let fixture: ComponentFixture<CanalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanalDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
