import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CseoComponent } from './cseo.component';

describe('CseoComponent', () => {
  let component: CseoComponent;
  let fixture: ComponentFixture<CseoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CseoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
