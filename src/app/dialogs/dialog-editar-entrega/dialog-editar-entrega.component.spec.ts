import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarEntregaComponent } from './dialog-editar-entrega.component';

describe('DialogEditarEntregaComponent', () => {
  let component: DialogEditarEntregaComponent;
  let fixture: ComponentFixture<DialogEditarEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
