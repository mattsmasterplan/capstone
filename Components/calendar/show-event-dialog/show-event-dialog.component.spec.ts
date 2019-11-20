import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventDialogComponent } from './show-event-dialog.component';

describe('ShowEventDialogComponent', () => {
  let component: ShowEventDialogComponent;
  let fixture: ComponentFixture<ShowEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
