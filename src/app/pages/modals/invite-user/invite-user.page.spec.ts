import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUserPage } from './invite-user.page';

describe('InviteUserPage', () => {
  let component: InviteUserPage;
  let fixture: ComponentFixture<InviteUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
