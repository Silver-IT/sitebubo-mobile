import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailedPlanPage } from './detailed-plan.page';

describe('DetailedPlanPage', () => {
  let component: DetailedPlanPage;
  let fixture: ComponentFixture<DetailedPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedPlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailedPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
