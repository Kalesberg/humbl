import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TextOrderPage } from './text-order.page';

describe('TextOrderPage', () => {
  let component: TextOrderPage;
  let fixture: ComponentFixture<TextOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TextOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
