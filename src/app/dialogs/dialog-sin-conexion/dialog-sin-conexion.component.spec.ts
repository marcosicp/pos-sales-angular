import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSinConexionComponent } from './dialog-sin-conexion.component';

describe('DialogSinConexionComponent', () => {
  let component: DialogSinConexionComponent;
  let fixture: ComponentFixture<DialogSinConexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSinConexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSinConexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
