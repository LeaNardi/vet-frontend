import { TestBed } from '@angular/core/testing';

import { MiusuarioService } from './miusuario.service';

describe('MiusuarioService', () => {
  let service: MiusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
