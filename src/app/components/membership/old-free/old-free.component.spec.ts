import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldFreeComponent } from './old-free.component';

describe('OldFreeComponent', () => {
  let component: OldFreeComponent;
  let fixture: ComponentFixture<OldFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldFreeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
