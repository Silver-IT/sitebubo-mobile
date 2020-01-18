import { TestBed } from '@angular/core/testing';

import { MonitorApiService } from './monitor-api.service';

describe('MonitorApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitorApiService = TestBed.get(MonitorApiService);
    expect(service).toBeTruthy();
  });
});
