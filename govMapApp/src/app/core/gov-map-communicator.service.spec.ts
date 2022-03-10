import { TestBed } from '@angular/core/testing';

import { GovMapCommunicatorService } from './gov-map-communicator.service';

describe('GovMapCommunicatorService', () => {
  let service: GovMapCommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovMapCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
