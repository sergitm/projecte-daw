import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositiusComponent } from './dispositius.component';

describe('DispositiusComponent', () => {
  let component: DispositiusComponent;
  let fixture: ComponentFixture<DispositiusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispositiusComponent]
    });
    fixture = TestBed.createComponent(DispositiusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
