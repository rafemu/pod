import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddNotebookComponent } from './project-add-notebook.component';

describe('ProjectAddNotebookComponent', () => {
  let component: ProjectAddNotebookComponent;
  let fixture: ComponentFixture<ProjectAddNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddNotebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
