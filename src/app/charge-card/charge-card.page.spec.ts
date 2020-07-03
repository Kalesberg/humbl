import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCardPage } from './charge-card.page';

describe('ChargeCardPage', () => {
  let component: ChargeCardPage;
  let fixture: ComponentFixture<ChargeCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
