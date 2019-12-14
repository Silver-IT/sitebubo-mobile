import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifymailPage } from './verifymail.page';

describe('VerifymailPage', () => {
  let component: VerifymailPage;
  let fixture: ComponentFixture<VerifymailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifymailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifymailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
