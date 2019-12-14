import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeebackSuccessPage } from './feeback-success.page';

describe('FeebackSuccessPage', () => {
  let component: FeebackSuccessPage;
  let fixture: ComponentFixture<FeebackSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeebackSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeebackSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
