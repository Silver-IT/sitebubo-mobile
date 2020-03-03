import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteUserPage } from './invite-user.page';

describe('InviteUserPage', () => {
  let component: InviteUserPage;
  let fixture: ComponentFixture<InviteUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
