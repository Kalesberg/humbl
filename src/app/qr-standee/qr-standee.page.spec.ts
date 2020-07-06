import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrStandeePage } from './qr-standee.page';

describe('QrStandeePage', () => {
  let component: QrStandeePage;
  let fixture: ComponentFixture<QrStandeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrStandeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrStandeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
