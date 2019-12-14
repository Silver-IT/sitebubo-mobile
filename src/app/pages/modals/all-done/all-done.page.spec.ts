import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDonePage } from './all-done.page';

describe('AllDonePage', () => {
  let component: AllDonePage;
  let fixture: ComponentFixture<AllDonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
