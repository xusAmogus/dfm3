import { TestBed } from '@angular/core/testing';

import { WriteupService } from './writeup.service';

describe('WriteupService', () => {
  let service: WriteupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
