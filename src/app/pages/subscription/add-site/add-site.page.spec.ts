import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddSitePage } from './add-site.page';

describe('AddSitePage', () => {
  let component: AddSitePage;
  let fixture: ComponentFixture<AddSitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddSitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
