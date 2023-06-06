import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacioComponent } from './importacio.component';

describe('ImportacioComponent', () => {
  let component: ImportacioComponent;
  let fixture: ComponentFixture<ImportacioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImportacioComponent]
    });
    fixture = TestBed.createComponent(ImportacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
