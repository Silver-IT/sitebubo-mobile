import { TestBed } from '@angular/core/testing';

import { IongagetService } from './iongaget.service';

describe('IongagetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IongagetService = TestBed.get(IongagetService);
    expect(service).toBeTruthy();
  });
});
