import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayBillsPage } from './pay-bills.page';

describe('PayBillsPage', () => {
  let component: PayBillsPage;
  let fixture: ComponentFixture<PayBillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayBillsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayBillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
