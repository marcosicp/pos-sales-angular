import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEgresoCajaComponent } from './dialog-egreso-caja.component';

describe('DialogEgresoCajaComponent', () => {
  let component: DialogEgresoCajaComponent;
  let fixture: ComponentFixture<DialogEgresoCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEgresoCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEgresoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
