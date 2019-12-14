import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorIssuesPage } from './monitor-issues.page';

describe('MonitorIssuesPage', () => {
  let component: MonitorIssuesPage;
  let fixture: ComponentFixture<MonitorIssuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorIssuesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorIssuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
