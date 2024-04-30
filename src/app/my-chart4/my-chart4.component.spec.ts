import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChart4Component } from './my-chart4.component';

describe('MyChart4Component', () => {
  let component: MyChart4Component;
  let fixture: ComponentFixture<MyChart4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyChart4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyChart4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
