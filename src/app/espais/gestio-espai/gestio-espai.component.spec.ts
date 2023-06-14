import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioEspaiComponent } from './gestio-espai.component';

describe('GestioEspaiComponent', () => {
  let component: GestioEspaiComponent;
  let fixture: ComponentFixture<GestioEspaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioEspaiComponent]
    });
    fixture = TestBed.createComponent(GestioEspaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
