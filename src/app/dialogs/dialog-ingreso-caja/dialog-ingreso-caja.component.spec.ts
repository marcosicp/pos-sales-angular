import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIngresoCajaComponent } from './dialog-ingreso-caja.component';

describe('DialogIngresoCajaComponent', () => {
  let component: DialogIngresoCajaComponent;
  let fixture: ComponentFixture<DialogIngresoCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIngresoCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIngresoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
