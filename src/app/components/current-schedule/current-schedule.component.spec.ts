import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentScheduleComponent } from './current-schedule.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('CurrentScheduleComponent', () => {
  let component: CurrentScheduleComponent;
  let fixture: ComponentFixture<CurrentScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CurrentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
