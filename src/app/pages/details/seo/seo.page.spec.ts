import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoPage } from './seo.page';

describe('SeoPage', () => {
  let component: SeoPage;
  let fixture: ComponentFixture<SeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
