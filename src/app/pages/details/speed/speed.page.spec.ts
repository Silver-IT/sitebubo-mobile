import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpeedPage } from './speed.page';

describe('SpeedPage', () => {
  let component: SpeedPage;
  let fixture: ComponentFixture<SpeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
