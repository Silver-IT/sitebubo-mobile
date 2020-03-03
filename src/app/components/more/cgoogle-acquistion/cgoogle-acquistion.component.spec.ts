import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CgoogleAcquistionComponent } from './cgoogle-acquistion.component';

describe('CgoogleAcquistionComponent', () => {
  let component: CgoogleAcquistionComponent;
  let fixture: ComponentFixture<CgoogleAcquistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgoogleAcquistionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CgoogleAcquistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
