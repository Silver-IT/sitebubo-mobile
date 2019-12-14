import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListPage } from './notification-list.page';

describe('NotificationListPage', () => {
  let component: NotificationListPage;
  let fixture: ComponentFixture<NotificationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
