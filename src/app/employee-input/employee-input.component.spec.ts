import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInputComponent } from './employee-input.component';

describe('EmployeeInputComponent', () => {
  let component: EmployeeInputComponent;
  let fixture: ComponentFixture<EmployeeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
