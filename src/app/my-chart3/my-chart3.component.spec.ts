import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChart3Component } from './my-chart3.component';

describe('MyChart3Component', () => {
  let component: MyChart3Component;
  let fixture: ComponentFixture<MyChart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyChart3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
