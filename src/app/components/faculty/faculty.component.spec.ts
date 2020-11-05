import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyComponent } from './faculty.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('FacultyComponent', () => {
  let component: FacultyComponent;
  let fixture: ComponentFixture<FacultyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ FacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
