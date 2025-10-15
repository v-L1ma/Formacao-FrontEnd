import { TestBed } from '@angular/core/testing';

import { MensagemDeErroService } from './mensagem-de-erro.service';

describe('MensagemDeErroService', () => {
  let service: MensagemDeErroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagemDeErroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
