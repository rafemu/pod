import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleMainComponent } from './people-main.component';

describe('PeopleMainComponent', () => {
  let component: PeopleMainComponent;
  let fixture: ComponentFixture<PeopleMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
