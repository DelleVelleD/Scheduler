import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesOfferedComponent } from './courses-offered.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('CoursesOfferedComponent', () => {
  let component: CoursesOfferedComponent;
  let fixture: ComponentFixture<CoursesOfferedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CoursesOfferedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
