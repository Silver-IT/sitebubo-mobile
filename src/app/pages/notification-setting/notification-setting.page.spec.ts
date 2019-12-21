import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSettingPage } from './notification-setting.page';

describe('NotificationSettingPage', () => {
  let component: NotificationSettingPage;
  let fixture: ComponentFixture<NotificationSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
