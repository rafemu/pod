import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimeComponent } from './project-time.component';

describe('ProjectTimeComponent', () => {
  let component: ProjectTimeComponent;
  let fixture: ComponentFixture<ProjectTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
