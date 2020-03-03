import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CmobileComponent } from './cmobile.component';

describe('CmobileComponent', () => {
  let component: CmobileComponent;
  let fixture: ComponentFixture<CmobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmobileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
