import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomainListPage } from './domain-list.page';

describe('DomainListPage', () => {
  let component: DomainListPage;
  let fixture: ComponentFixture<DomainListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomainListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
