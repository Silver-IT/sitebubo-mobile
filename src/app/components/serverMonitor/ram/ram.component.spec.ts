import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RamComponent } from './ram.component';

describe('RamComponent', () => {
  let component: RamComponent;
  let fixture: ComponentFixture<RamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
