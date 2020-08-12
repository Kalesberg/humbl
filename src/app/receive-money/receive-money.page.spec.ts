import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceiveMoneyPage } from './receive-money.page';

describe('ReceiveMoneyPage', () => {
  let component: ReceiveMoneyPage;
  let fixture: ComponentFixture<ReceiveMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveMoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiveMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
