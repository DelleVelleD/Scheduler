import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableHoursComponent } from './available-hours.component';

describe('AvailableHoursComponent', () => {
  let component: AvailableHoursComponent;
  let fixture: ComponentFixture<AvailableHoursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
