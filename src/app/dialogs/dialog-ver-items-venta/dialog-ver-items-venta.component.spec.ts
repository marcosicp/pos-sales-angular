import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerItemsPedidoComponent } from './dialog-ver-items-venta.component';

describe('DialogVerItemsPedidoComponent', () => {
  let component: DialogVerItemsPedidoComponent;
  let fixture: ComponentFixture<DialogVerItemsPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVerItemsPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerItemsPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
