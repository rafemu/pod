import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTaskListComponent } from './save-task-list.component';

describe('SaveTaskListComponent', () => {
  let component: SaveTaskListComponent;
  let fixture: ComponentFixture<SaveTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
