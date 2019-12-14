import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDomainPage } from './add-domain.page';

describe('AddDomainPage', () => {
  let component: AddDomainPage;
  let fixture: ComponentFixture<AddDomainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDomainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDomainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
