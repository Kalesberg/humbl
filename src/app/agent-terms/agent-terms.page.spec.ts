import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentTermsPage } from './agent-terms.page';

describe('AgentTermsPage', () => {
  let component: AgentTermsPage;
  let fixture: ComponentFixture<AgentTermsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTermsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentTermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
