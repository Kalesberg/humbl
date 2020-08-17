import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MerchantProfilePage } from './merchant-profile.page';

describe('MerchantProfilePage', () => {
  let component: MerchantProfilePage;
  let fixture: ComponentFixture<MerchantProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchantProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
