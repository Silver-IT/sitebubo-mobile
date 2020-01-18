import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OldFreeComponent } from './old-free.component';

describe('OldFreeComponent', () => {
  let component: OldFreeComponent;
  let fixture: ComponentFixture<OldFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldFreeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OldFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
