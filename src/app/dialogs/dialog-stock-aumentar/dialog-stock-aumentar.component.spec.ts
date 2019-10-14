import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStockAumentarComponent } from './dialog-stock-aumentar.component';

describe('DialogStockAumentarComponent', () => {
  let component: DialogStockAumentarComponent;
  let fixture: ComponentFixture<DialogStockAumentarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStockAumentarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStockAumentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
