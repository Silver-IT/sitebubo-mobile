import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CseoscoreComponent } from './cseoscore.component';

describe('CseoscoreComponent', () => {
  let component: CseoscoreComponent;
  let fixture: ComponentFixture<CseoscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CseoscoreComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CseoscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
