import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPDFComponent } from './dialog-pdf.component';

describe('DialogPDFComponent', () => {
  let component: DialogPDFComponent;
  let fixture: ComponentFixture<DialogPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
