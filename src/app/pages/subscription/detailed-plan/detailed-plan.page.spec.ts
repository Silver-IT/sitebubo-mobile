import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedPlanPage } from './detailed-plan.page';

describe('DetailedPlanPage', () => {
  let component: DetailedPlanPage;
  let fixture: ComponentFixture<DetailedPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
