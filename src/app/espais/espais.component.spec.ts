import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaisComponent } from './espais.component';

describe('EspaisComponent', () => {
  let component: EspaisComponent;
  let fixture: ComponentFixture<EspaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaisComponent]
    });
    fixture = TestBed.createComponent(EspaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
