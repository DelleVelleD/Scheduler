import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageFacultyComponent } from './homepage-faculty.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('HomepageFacultyComponent', () => {
  let component: HomepageFacultyComponent;
  let fixture: ComponentFixture<HomepageFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
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
