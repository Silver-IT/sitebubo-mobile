import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelMembershipPage } from './cancel-membership.page';

describe('CancelMembershipPage', () => {
  let component: CancelMembershipPage;
  let fixture: ComponentFixture<CancelMembershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelMembershipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelMembershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
