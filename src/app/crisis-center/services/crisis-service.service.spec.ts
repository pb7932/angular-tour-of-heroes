import { TestBed } from '@angular/core/testing';

import { CrisisServiceService } from './crisis-service.service';

describe('CrisisServiceService', () => {
  let service: CrisisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrisisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
