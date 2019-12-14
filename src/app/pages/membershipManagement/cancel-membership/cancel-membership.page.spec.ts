import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMembershipPage } from './cancel-membership.page';

describe('CancelMembershipPage', () => {
  let component: CancelMembershipPage;
  let fixture: ComponentFixture<CancelMembershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelMembershipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelMembershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
