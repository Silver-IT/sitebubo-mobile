import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CgoogleVisitorsComponent } from './cgoogle-visitors.component';

describe('CgoogleVisitorsComponent', () => {
  let component: CgoogleVisitorsComponent;
  let fixture: ComponentFixture<CgoogleVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CgoogleVisitorsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CgoogleVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
