import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServerMonitorPage } from './server-monitor.page';

describe('ServerMonitorPage', () => {
  let component: ServerMonitorPage;
  let fixture: ComponentFixture<ServerMonitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerMonitorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServerMonitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
