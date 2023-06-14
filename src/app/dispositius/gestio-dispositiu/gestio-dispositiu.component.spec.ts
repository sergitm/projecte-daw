import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioDispositiuComponent } from './gestio-dispositiu.component';

describe('GestioDispositiuComponent', () => {
  let component: GestioDispositiuComponent;
  let fixture: ComponentFixture<GestioDispositiuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioDispositiuComponent]
    });
    fixture = TestBed.createComponent(GestioDispositiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
