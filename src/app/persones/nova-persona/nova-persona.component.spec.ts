import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPersonaComponent } from './nova-persona.component';

describe('NovaPersonaComponent', () => {
  let component: NovaPersonaComponent;
  let fixture: ComponentFixture<NovaPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovaPersonaComponent]
    });
    fixture = TestBed.createComponent(NovaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
