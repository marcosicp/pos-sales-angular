import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCerrarCajaComponent } from './dialog-cerrar-caja.component';

describe('DialogCerrarCajaComponent', () => {
  let component: DialogCerrarCajaComponent;
  let fixture: ComponentFixture<DialogCerrarCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCerrarCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCerrarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
