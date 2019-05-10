import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskListComponent } from './add-task-list.component';

describe('AddTaskListComponent', () => {
  let component: AddTaskListComponent;
  let fixture: ComponentFixture<AddTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
