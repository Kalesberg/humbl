import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayBillsDetailPage } from './pay-bills-detail.page';

describe('PayBillsDetailPage', () => {
  let component: PayBillsDetailPage;
  let fixture: ComponentFixture<PayBillsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayBillsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayBillsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
