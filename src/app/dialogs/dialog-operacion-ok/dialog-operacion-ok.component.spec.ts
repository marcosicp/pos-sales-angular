import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOperacionOkComponent } from './dialog-operacion-ok.component';

describe('DialogOperacionOkComponent', () => {
  let component: DialogOperacionOkComponent;
  let fixture: ComponentFixture<DialogOperacionOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOperacionOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOperacionOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
