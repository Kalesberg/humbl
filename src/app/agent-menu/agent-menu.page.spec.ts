import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentMenuPage } from './agent-menu.page';

describe('AgentMenuPage', () => {
  let component: AgentMenuPage;
  let fixture: ComponentFixture<AgentMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
