import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGestionarProductoComponent } from './dialog-gestionar-producto.component';

describe('DialogGestionarProductoComponent', () => {
  let component: DialogGestionarProductoComponent;
  let fixture: ComponentFixture<DialogGestionarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGestionarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGestionarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
