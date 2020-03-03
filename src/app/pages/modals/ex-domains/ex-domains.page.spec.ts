import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExDomainsPage } from './ex-domains.page';

describe('ExDomainsPage', () => {
  let component: ExDomainsPage;
  let fixture: ComponentFixture<ExDomainsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExDomainsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExDomainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
