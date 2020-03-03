import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CdesktopComponent } from './cdesktop.component';

describe('CdesktopComponent', () => {
  let component: CdesktopComponent;
  let fixture: ComponentFixture<CdesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdesktopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CdesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
