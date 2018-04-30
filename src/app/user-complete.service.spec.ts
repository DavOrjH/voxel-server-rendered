import { TestBed, inject } from '@angular/core/testing';

import { UserCompleteService } from './user-complete.service';

describe('UserCompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCompleteService]
    });
  });

  it('should be created', inject([UserCompleteService], (service: UserCompleteService) => {
    expect(service).toBeTruthy();
  }));
});
