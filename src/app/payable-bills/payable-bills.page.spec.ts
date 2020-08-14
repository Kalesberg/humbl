import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayableBillsPage } from './payable-bills.page';

describe('PayableBillsPage', () => {
  let component: PayableBillsPage;
  let fixture: ComponentFixture<PayableBillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayableBillsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayableBillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
