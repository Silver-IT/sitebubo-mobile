import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainScanPage } from './domain-scan.page';

describe('DomainScanPage', () => {
  let component: DomainScanPage;
  let fixture: ComponentFixture<DomainScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainScanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
