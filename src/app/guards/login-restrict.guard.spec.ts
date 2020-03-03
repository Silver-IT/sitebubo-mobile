import { TestBed, async, inject } from '@angular/core/testing';

import { LoginRestrictGuard } from './login-restrict.guard';

describe('LoginRestrictGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRestrictGuard]
    });
  });

  it('should ...', inject([LoginRestrictGuard], (guard: LoginRestrictGuard) => {
    expect(guard).toBeTruthy();
  }));
});
