import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailCustomizationPage } from './email-customization.page';

describe('EmailCustomizationPage', () => {
  let component: EmailCustomizationPage;
  let fixture: ComponentFixture<EmailCustomizationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCustomizationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailCustomizationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
