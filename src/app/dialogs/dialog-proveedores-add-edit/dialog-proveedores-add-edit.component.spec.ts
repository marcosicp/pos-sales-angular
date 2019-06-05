import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProveedoresAddEditComponent } from './dialog-proveedores-add-edit.component';

describe('DialogProveedoresAddEditComponent', () => {
  let component: DialogProveedoresAddEditComponent;
  let fixture: ComponentFixture<DialogProveedoresAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProveedoresAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProveedoresAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
