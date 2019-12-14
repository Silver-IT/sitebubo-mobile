import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDoneComponent } from './all-done.component';

describe('AllDoneComponent', () => {
  let component: AllDoneComponent;
  let fixture: ComponentFixture<AllDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDoneComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
