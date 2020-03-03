import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoogleAnalyticsPage } from './google-analytics.page';

describe('GoogleAnalyticsPage', () => {
  let component: GoogleAnalyticsPage;
  let fixture: ComponentFixture<GoogleAnalyticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAnalyticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
