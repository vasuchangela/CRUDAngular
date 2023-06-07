import { TestBed } from '@angular/core/testing';

import { CRUDTaskServiceService } from './crudtask-service.service';

describe('CRUDTaskServiceService', () => {
  let service: CRUDTaskServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDTaskServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
