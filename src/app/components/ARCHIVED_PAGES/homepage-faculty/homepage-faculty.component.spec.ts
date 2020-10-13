import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFacultyComponent } from './homepage-faculty.component';

describe('HomepageFacultyComponent', () => {
  let component: HomepageFacultyComponent;
  let fixture: ComponentFixture<HomepageFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
