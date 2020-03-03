import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PallDoneComponent } from './pall-done.component';

describe('PallDoneComponent', () => {
  let component: PallDoneComponent;
  let fixture: ComponentFixture<PallDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PallDoneComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PallDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
