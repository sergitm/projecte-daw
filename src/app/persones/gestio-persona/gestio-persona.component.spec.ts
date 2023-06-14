import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioPersonaComponent } from './gestio-persona.component';

describe('GestioPersonaComponent', () => {
  let component: GestioPersonaComponent;
  let fixture: ComponentFixture<GestioPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioPersonaComponent]
    });
    fixture = TestBed.createComponent(GestioPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
