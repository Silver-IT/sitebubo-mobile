import { TestBed } from '@angular/core/testing';

import { SubscriptionApiService } from './subscription-api.service';

describe('SubscriptionApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionApiService = TestBed.get(SubscriptionApiService);
    expect(service).toBeTruthy();
  });
});
