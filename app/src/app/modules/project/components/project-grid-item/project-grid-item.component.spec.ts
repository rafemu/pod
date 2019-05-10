import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGridItemComponent } from './project-grid-item.component';

describe('ProjectGridItemComponent', () => {
  let component: ProjectGridItemComponent;
  let fixture: ComponentFixture<ProjectGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
