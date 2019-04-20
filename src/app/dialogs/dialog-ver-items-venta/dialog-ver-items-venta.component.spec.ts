import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerItemsVentaComponent } from './dialog-ver-items-venta.component';

describe('DialogVerItemsVentaComponent', () => {
  let component: DialogVerItemsVentaComponent;
  let fixture: ComponentFixture<DialogVerItemsVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVerItemsVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerItemsVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
