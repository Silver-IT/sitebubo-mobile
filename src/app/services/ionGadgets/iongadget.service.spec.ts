import { TestBed } from '@angular/core/testing';

import { IongadgetService } from './iongadget.service';

describe('IongadgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IongadgetService = TestBed.get(IongadgetService);
    expect(service).toBeTruthy();
  });
});
