import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLogItemComponent } from './time-log-item.component';

describe('TimeLogItemComponent', () => {
  let component: TimeLogItemComponent;
  let fixture: ComponentFixture<TimeLogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
