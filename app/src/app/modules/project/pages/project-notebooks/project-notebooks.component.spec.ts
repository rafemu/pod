import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotebooksComponent } from './project-notebooks.component';

describe('ProjectNotebooksComponent', () => {
  let component: ProjectNotebooksComponent;
  let fixture: ComponentFixture<ProjectNotebooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotebooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
