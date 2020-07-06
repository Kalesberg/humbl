import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrDashboardPage } from './qr-dashboard.page';

describe('QrDashboardPage', () => {
  let component: QrDashboardPage;
  let fixture: ComponentFixture<QrDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
