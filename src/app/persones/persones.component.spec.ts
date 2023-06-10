import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonesComponent } from './persones.component';

describe('PersonesComponent', () => {
  let component: PersonesComponent;
  let fixture: ComponentFixture<PersonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonesComponent]
    });
    fixture = TestBed.createComponent(PersonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
