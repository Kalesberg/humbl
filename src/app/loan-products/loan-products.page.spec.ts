import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanProductsPage } from './loan-products.page';

describe('LoanProductsPage', () => {
  let component: LoanProductsPage;
  let fixture: ComponentFixture<LoanProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
