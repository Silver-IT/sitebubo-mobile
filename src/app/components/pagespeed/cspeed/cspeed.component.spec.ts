import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CspeedComponent } from './cspeed.component';

describe('CspeedComponent', () => {
  let component: CspeedComponent;
  let fixture: ComponentFixture<CspeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CspeedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CspeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
