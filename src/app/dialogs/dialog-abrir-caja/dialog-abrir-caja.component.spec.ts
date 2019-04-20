import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAbrirCajaComponent } from './dialog-abrir-caja.component';

describe('DialogAbrirCajaComponent', () => {
  let component: DialogAbrirCajaComponent;
  let fixture: ComponentFixture<DialogAbrirCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAbrirCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAbrirCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
