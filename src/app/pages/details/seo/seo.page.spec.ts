import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeoPage } from './seo.page';

describe('SeoPage', () => {
  let component: SeoPage;
  let fixture: ComponentFixture<SeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
