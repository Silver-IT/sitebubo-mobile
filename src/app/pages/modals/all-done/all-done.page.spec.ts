import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllDonePage } from './all-done.page';

describe('AllDonePage', () => {
  let component: AllDonePage;
  let fixture: ComponentFixture<AllDonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllDonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
