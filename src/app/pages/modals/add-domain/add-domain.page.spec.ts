import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDomainPage } from './add-domain.page';

describe('AddDomainPage', () => {
  let component: AddDomainPage;
  let fixture: ComponentFixture<AddDomainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDomainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDomainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
