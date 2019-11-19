import { TestBed } from '@angular/core/testing';

import { CourselistService } from './courselist.service';

describe('CourselistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourselistService = TestBed.get(CourselistService);
    expect(service).toBeTruthy();
  });
});
