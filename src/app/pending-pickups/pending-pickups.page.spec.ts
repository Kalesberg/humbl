import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendingPickupsPage } from './pending-pickups.page';

describe('PendingPickupsPage', () => {
  let component: PendingPickupsPage;
  let fixture: ComponentFixture<PendingPickupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPickupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingPickupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
