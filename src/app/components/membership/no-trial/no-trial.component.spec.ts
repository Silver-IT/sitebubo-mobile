import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTrialComponent } from './no-trial.component';

describe('NoTrialComponent', () => {
  let component: NoTrialComponent;
  let fixture: ComponentFixture<NoTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoTrialComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
