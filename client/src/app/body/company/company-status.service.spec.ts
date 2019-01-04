import { TestBed } from '@angular/core/testing';

import { CompanyStatusService } from './company-status.service';

describe('CompanyStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyStatusService = TestBed.get(CompanyStatusService);
    expect(service).toBeTruthy();
  });
});
