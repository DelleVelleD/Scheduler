import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCourselistComponent } from './faculty-courselist.component';

describe('CourselistComponent', () => {
  let component: FacultyCourselistComponent;
  let fixture: ComponentFixture<FacultyCourselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultyCourselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyCourselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
