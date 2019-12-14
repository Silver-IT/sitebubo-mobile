import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdomainExpireComponent } from './cdomain-expire.component';

describe('CdomainExpireComponent', () => {
  let component: CdomainExpireComponent;
  let fixture: ComponentFixture<CdomainExpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdomainExpireComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdomainExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
