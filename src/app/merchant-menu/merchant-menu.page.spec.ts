import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MerchantMenuPage } from './merchant-menu.page';

describe('MerchantMenuPage', () => {
  let component: MerchantMenuPage;
  let fixture: ComponentFixture<MerchantMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchantMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
