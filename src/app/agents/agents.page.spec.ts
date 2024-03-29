import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentsPage } from './agents.page';

describe('AgentsPage', () => {
  let component: AgentsPage;
  let fixture: ComponentFixture<AgentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
