import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionSummaryPage } from './transaction-summary.page';

describe('TransactionSummaryPage', () => {
  let component: TransactionSummaryPage;
  let fixture: ComponentFixture<TransactionSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
