import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeesComponent } from './show-employees.component';

describe('ShowEmployeesComponent', () => {
  let component: ShowEmployeesComponent;
  let fixture: ComponentFixture<ShowEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
