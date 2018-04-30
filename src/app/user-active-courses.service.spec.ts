import { TestBed, inject } from '@angular/core/testing';

import { UserActiveCoursesService } from './user-active-courses.service';

describe('UserActiveCoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserActiveCoursesService]
    });
  });

  it('should be created', inject([UserActiveCoursesService], (service: UserActiveCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
