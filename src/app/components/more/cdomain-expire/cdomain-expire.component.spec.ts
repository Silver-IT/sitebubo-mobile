import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CdomainExpireComponent } from './cdomain-expire.component';

describe('CdomainExpireComponent', () => {
  let component: CdomainExpireComponent;
  let fixture: ComponentFixture<CdomainExpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdomainExpireComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CdomainExpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
