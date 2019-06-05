import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClienteAddEditComponent } from './dialog-cliente-add-edit.component';

describe('DialogClienteAddEditComponent', () => {
  let component: DialogClienteAddEditComponent;
  let fixture: ComponentFixture<DialogClienteAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogClienteAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClienteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
