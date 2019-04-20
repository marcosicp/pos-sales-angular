import { Component, OnInit } from '@angular/core';
import { RetiroCaja } from '../../models/retiro-caja.model';

@Component({
  selector: 'app-dialog-ingreso-caja',
  templateUrl: './dialog-ingreso-caja.component.html',
  styleUrls: ['./dialog-ingreso-caja.component.scss']
})
export class DialogIngresoCajaComponent implements OnInit {
  ingresoCaja:  RetiroCaja = new RetiroCaja();
  constructor() { }

  ngOnInit() {
  }

  guardar() {
  }

}
