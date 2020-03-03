import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CgoogleConversionComponent } from './cgoogle-conversion.component';

describe('CgoogleConversionComponent', () => {
  let component: CgoogleConversionComponent;
  let fixture: ComponentFixture<CgoogleConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgoogleConversionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CgoogleConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
