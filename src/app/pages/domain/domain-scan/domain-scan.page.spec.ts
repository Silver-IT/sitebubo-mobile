import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DomainScanPage } from './domain-scan.page';

describe('DomainScanPage', () => {
  let component: DomainScanPage;
  let fixture: ComponentFixture<DomainScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DomainScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
