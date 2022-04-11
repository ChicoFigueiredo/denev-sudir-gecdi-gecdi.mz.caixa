import { TestBed } from '@angular/core/testing';

import { TemplatesRespostaService } from './templates-resposta.service';

describe('TemplatesRespostaService', () => {
  let service: TemplatesRespostaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplatesRespostaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
