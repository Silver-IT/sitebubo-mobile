import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyemailPage } from './verifyemail.page';

describe('VerifyemailPage', () => {
  let component: VerifyemailPage;
  let fixture: ComponentFixture<VerifyemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyemailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
