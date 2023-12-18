import { TestBed } from '@angular/core/testing';

import { EtudService } from './etud.service';

describe('EtudService', () => {
  let service: EtudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
