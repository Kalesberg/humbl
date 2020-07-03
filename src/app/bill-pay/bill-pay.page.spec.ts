import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillPayPage } from './bill-pay.page';

describe('BillPayPage', () => {
  let component: BillPayPage;
  let fixture: ComponentFixture<BillPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
