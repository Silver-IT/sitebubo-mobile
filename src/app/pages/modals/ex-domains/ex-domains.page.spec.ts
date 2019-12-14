import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExDomainsPage } from './ex-domains.page';

describe('ExDomainsPage', () => {
  let component: ExDomainsPage;
  let fixture: ComponentFixture<ExDomainsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExDomainsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExDomainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
