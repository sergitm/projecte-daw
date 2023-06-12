import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouDispositiuComponent } from './nou-dispositiu.component';

describe('NouDispositiuComponent', () => {
  let component: NouDispositiuComponent;
  let fixture: ComponentFixture<NouDispositiuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NouDispositiuComponent]
    });
    fixture = TestBed.createComponent(NouDispositiuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
