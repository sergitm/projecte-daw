import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouEspaiComponent } from './nou-espai.component';

describe('NouEspaiComponent', () => {
  let component: NouEspaiComponent;
  let fixture: ComponentFixture<NouEspaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NouEspaiComponent]
    });
    fixture = TestBed.createComponent(NouEspaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
