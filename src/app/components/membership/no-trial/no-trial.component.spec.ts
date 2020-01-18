import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoTrialComponent } from './no-trial.component';

describe('NoTrialComponent', () => {
  let component: NoTrialComponent;
  let fixture: ComponentFixture<NoTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoTrialComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
