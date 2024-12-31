import { TestBed } from '@angular/core/testing';

import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculadoraService]
    });
    service = TestBed.inject(CalculadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve garantir que 1 + 4 = 5', () => {
    const soma = service.calcular(1, 4, CalculadoraService.SOMA);
    expect(soma).toEqual(5);
  });

  it('deve garantir que 4 - 3 = 1', () => {
    const soma = service.calcular(4, 3, CalculadoraService.SUBTRACAO);
    expect(soma).toEqual(1);
  });

  it('deve garantir que 8 / 2 = 4', () => {
    const soma = service.calcular(8, 2, CalculadoraService.DIVISAO);
    expect(soma).toEqual(4);
  });
});
