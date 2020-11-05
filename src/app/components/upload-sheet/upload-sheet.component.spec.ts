import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSheetComponent } from './upload-sheet.component';

import { HttpClientModule } from '@angular/common/http'; 

describe('UploadSheetComponent', () => {
  let component: UploadSheetComponent;
  let fixture: ComponentFixture<UploadSheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ UploadSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
