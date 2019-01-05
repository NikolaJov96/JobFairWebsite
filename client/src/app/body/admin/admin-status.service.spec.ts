import { TestBed } from '@angular/core/testing';

import { AdminStatusService } from './admin-status.service';

describe('AdminStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminStatusService = TestBed.get(AdminStatusService);
    expect(service).toBeTruthy();
  });
});
