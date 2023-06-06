import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracioComponent } from './administracio.component';

describe('AdministracioComponent', () => {
  let component: AdministracioComponent;
  let fixture: ComponentFixture<AdministracioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministracioComponent]
    });
    fixture = TestBed.createComponent(AdministracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
