import { TestBed } from '@angular/core/testing';

import { CacheServService } from './cache-serv.service';

describe('CacheServService', () => {
  let service: CacheServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
