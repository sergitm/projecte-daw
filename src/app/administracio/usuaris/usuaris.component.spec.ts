import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarisComponent } from './usuaris.component';

describe('UsuarisComponent', () => {
  let component: UsuarisComponent;
  let fixture: ComponentFixture<UsuarisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarisComponent]
    });
    fixture = TestBed.createComponent(UsuarisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
