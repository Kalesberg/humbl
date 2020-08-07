import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanAndPayPage } from './scan-and-pay.page';

describe('ScanAndPayPage', () => {
  let component: ScanAndPayPage;
  let fixture: ComponentFixture<ScanAndPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanAndPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanAndPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
