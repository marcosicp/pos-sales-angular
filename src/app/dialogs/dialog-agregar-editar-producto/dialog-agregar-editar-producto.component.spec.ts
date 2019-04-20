import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgregarEditarProductoComponent } from './dialog-agregar-editar-producto.component';

describe('DialogAgregarEditarProductoComponent', () => {
  let component: DialogAgregarEditarProductoComponent;
  let fixture: ComponentFixture<DialogAgregarEditarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAgregarEditarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgregarEditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
