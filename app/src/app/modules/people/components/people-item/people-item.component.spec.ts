import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleItemComponent } from './people-item.component';

describe('PeopleItemComponent', () => {
  let component: PeopleItemComponent;
  let fixture: ComponentFixture<PeopleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
