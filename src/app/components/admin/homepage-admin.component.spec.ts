import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageAdminComponent } from './homepage-admin.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('HomepageAdminComponent', () => {
  let component: HomepageAdminComponent;
  let fixture: ComponentFixture<HomepageAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HomepageAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
