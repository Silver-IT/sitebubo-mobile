import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UptimePage } from './uptime.page';

describe('UptimePage', () => {
  let component: UptimePage;
  let fixture: ComponentFixture<UptimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UptimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UptimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
