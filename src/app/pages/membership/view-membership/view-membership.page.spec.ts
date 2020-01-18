import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMembershipPage } from './view-membership.page';

describe('ViewMembershipPage', () => {
  let component: ViewMembershipPage;
  let fixture: ComponentFixture<ViewMembershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMembershipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMembershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
