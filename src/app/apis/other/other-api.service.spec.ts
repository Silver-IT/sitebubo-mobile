import { TestBed } from '@angular/core/testing';

import { OtherApiService } from './other-api.service';

describe('OtherApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtherApiService = TestBed.get(OtherApiService);
    expect(service).toBeTruthy();
  });
});
