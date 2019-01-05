import { TestBed } from '@angular/core/testing';

import { GuestStatusService } from './guest-status.service';

describe('GuestStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestStatusService = TestBed.get(GuestStatusService);
    expect(service).toBeTruthy();
  });
});
