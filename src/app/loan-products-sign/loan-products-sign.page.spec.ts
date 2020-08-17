import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanProductsSignPage } from './loan-products-sign.page';

describe('LoanProductsSignPage', () => {
  let component: LoanProductsSignPage;
  let fixture: ComponentFixture<LoanProductsSignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanProductsSignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductsSignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
