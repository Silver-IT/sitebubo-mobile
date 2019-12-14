import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSitePage } from './add-site.page';

describe('AddSitePage', () => {
  let component: AddSitePage;
  let fixture: ComponentFixture<AddSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSitePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
