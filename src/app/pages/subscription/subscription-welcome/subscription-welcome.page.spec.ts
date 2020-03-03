import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscriptionWelcomePage } from './subscription-welcome.page';

describe('SubscriptionWelcomePage', () => {
  let component: SubscriptionWelcomePage;
  let fixture: ComponentFixture<SubscriptionWelcomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionWelcomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionWelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
