import { TestBed } from '@angular/core/testing';

import { CacheParametrosService } from './cache-parametros.service';

describe('CacheParametrosService', () => {
  let service: CacheParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
