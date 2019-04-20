import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCajaCerradaComponent } from './dialog-caja-cerrada.component';

describe('DialogcajacerradaComponent', () => {
  let component: DialogCajaCerradaComponent;
  let fixture: ComponentFixture<DialogCajaCerradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCajaCerradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCajaCerradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
