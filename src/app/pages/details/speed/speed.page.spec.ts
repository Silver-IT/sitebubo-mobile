import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedPage } from './speed.page';

describe('SpeedPage', () => {
  let component: SpeedPage;
  let fixture: ComponentFixture<SpeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
