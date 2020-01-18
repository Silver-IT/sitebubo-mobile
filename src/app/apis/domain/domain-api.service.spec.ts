import { TestBed } from '@angular/core/testing';

import { DomainApiService } from './domain-api.service';

describe('DomainApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainApiService = TestBed.get(DomainApiService);
    expect(service).toBeTruthy();
  });
});
