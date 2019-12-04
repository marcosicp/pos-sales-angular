import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarGananciasComponent } from './dialog-editar-ganancias.component';

describe('DialogEditarGananciasComponent', () => {
  let component: DialogEditarGananciasComponent;
  let fixture: ComponentFixture<DialogEditarGananciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarGananciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarGananciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
