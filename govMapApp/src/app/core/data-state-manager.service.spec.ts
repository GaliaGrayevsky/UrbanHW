import { TestBed } from '@angular/core/testing';

import { DataStateManagerService } from './data-state-manager.service';

describe('DataStateManagerService', () => {
  let service: DataStateManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStateManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
