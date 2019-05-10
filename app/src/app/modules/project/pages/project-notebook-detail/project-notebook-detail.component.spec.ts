import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotebookDetailComponent } from './project-notebook-detail.component';

describe('ProjectNotebookDetailComponent', () => {
  let component: ProjectNotebookDetailComponent;
  let fixture: ComponentFixture<ProjectNotebookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotebookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotebookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
