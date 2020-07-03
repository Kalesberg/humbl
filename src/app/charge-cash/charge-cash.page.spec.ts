import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCashPage } from './charge-cash.page';

describe('ChargeCashPage', () => {
  let component: ChargeCashPage;
  let fixture: ComponentFixture<ChargeCashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeCashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeCashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
