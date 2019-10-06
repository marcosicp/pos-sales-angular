import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUsuarioAddEditComponent } from './dialog-usuario-add-edit.component';

describe('DialogUsuarioAddEditComponent', () => {
  let component: DialogUsuarioAddEditComponent;
  let fixture: ComponentFixture<DialogUsuarioAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUsuarioAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUsuarioAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
