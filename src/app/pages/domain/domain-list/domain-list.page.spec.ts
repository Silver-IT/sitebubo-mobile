import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainListPage } from './domain-list.page';

describe('DomainListPage', () => {
  let component: DomainListPage;
  let fixture: ComponentFixture<DomainListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
