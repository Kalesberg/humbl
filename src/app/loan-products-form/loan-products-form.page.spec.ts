import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanProductsFormPage } from './loan-products-form.page';

describe('LoanProductsFormPage', () => {
  let component: LoanProductsFormPage;
  let fixture: ComponentFixture<LoanProductsFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanProductsFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
