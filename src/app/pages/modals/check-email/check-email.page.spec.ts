import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEmailPage } from './check-email.page';

describe('CheckEmailPage', () => {
  let component: CheckEmailPage;
  let fixture: ComponentFixture<CheckEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckEmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
