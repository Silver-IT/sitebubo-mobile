import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CblacklistComponent } from './cblacklist.component';

describe('CblacklistComponent', () => {
  let component: CblacklistComponent;
  let fixture: ComponentFixture<CblacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CblacklistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CblacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
