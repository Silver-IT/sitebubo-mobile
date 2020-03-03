import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SdomainListComponent } from './sdomain-list.component';

describe('SdomainListComponent', () => {
  let component: SdomainListComponent;
  let fixture: ComponentFixture<SdomainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdomainListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SdomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
