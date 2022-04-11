import { TestBed } from '@angular/core/testing';

import { AtendentesService } from './atendentes.service';

describe('AtendentesService', () => {
  let service: AtendentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtendentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
