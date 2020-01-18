import { TestBed } from '@angular/core/testing';

import { TransactionApiService } from './transaction-api.service';

describe('TransactionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionApiService = TestBed.get(TransactionApiService);
    expect(service).toBeTruthy();
  });
});
