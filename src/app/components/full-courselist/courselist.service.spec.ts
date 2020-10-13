import { TestBed } from '@angular/core/testing';

import { CourselistService } from './courselist.service';

import { HttpClientModule } from '@angular/common/http'; 

describe('CourselistService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: CourselistService = TestBed.get(CourselistService);
    expect(service).toBeTruthy();
  });
});
