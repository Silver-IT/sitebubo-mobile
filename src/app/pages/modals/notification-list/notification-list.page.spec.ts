import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationListPage } from './notification-list.page';

describe('NotificationListPage', () => {
  let component: NotificationListPage;
  let fixture: ComponentFixture<NotificationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
