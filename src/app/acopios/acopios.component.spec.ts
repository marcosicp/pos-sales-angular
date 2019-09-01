import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcopiosComponent } from './acopios.component';

describe('AcopiosComponent', () => {
  let component: AcopiosComponent;
  let fixture: ComponentFixture<AcopiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcopiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcopiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
