import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PactarEntregaComponent } from './pactar-entrega.component';

describe('PactarEntregaComponent', () => {
  let component: PactarEntregaComponent;
  let fixture: ComponentFixture<PactarEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PactarEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PactarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
