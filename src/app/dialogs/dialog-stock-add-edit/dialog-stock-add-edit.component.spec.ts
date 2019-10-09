import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStockAddEditComponent } from './dialog-stock-add-edit.component';

describe('DialogStockAddEditComponent', () => {
  let component: DialogStockAddEditComponent;
  let fixture: ComponentFixture<DialogStockAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStockAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStockAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
