import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayrollPage } from './payroll.page';

describe('PayrollPage', () => {
  let component: PayrollPage;
  let fixture: ComponentFixture<PayrollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
