import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesOfferedAdminComponent } from './courses-offered-admin.component';

describe('CoursesOfferedAdminComponent', () => {
  let component: CoursesOfferedAdminComponent;
  let fixture: ComponentFixture<CoursesOfferedAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesOfferedAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesOfferedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
