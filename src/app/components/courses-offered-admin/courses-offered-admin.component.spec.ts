import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesOfferedAdminComponent } from './courses-offered-admin.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesOfferedAdminComponent', () => {
  let component: CoursesOfferedAdminComponent;
  let fixture: ComponentFixture<CoursesOfferedAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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
