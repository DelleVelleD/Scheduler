import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentScheduleSplitComponent } from './current-schedule-split.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('CurrentScheduleSplitComponent', () => {
  let component: CurrentScheduleSplitComponent;
  let fixture: ComponentFixture<CurrentScheduleSplitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ CurrentScheduleSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentScheduleSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
