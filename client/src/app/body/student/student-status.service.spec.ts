import { TestBed } from '@angular/core/testing';

import { StudentStatusService } from './student-status.service';

describe('StudentStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentStatusService = TestBed.get(StudentStatusService);
    expect(service).toBeTruthy();
  });
});
