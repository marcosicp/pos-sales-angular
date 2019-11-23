import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarCambioFechaComponent } from './dialog-confirmar-cambio-fecha.component';

describe('DialogConfirmarCambioFechaComponent', () => {
  let component: DialogConfirmarCambioFechaComponent;
  let fixture: ComponentFixture<DialogConfirmarCambioFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmarCambioFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmarCambioFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
