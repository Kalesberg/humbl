import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrGenerateInfoPage } from './qr-generate-info.page';

describe('QrGenerateInfoPage', () => {
  let component: QrGenerateInfoPage;
  let fixture: ComponentFixture<QrGenerateInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrGenerateInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrGenerateInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
