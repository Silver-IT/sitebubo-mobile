import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UptimePage } from './uptime.page';

describe('UptimePage', () => {
  let component: UptimePage;
  let fixture: ComponentFixture<UptimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UptimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UptimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
