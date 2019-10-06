import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambiarPassComponent } from './dialog-cambiar-pass.component';

describe('DialogCambiarPassComponent', () => {
  let component: DialogCambiarPassComponent;
  let fixture: ComponentFixture<DialogCambiarPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCambiarPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCambiarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
