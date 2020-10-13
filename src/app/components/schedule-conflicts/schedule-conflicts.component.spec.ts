import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleConflictsComponent } from './schedule-conflicts.component';

describe('ScheduleConflictsComponent', () => {
  let component: ScheduleConflictsComponent;
  let fixture: ComponentFixture<ScheduleConflictsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleConflictsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleConflictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
