import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorIssuesPage } from './monitor-issues.page';

describe('MonitorIssuesPage', () => {
  let component: MonitorIssuesPage;
  let fixture: ComponentFixture<MonitorIssuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorIssuesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorIssuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
