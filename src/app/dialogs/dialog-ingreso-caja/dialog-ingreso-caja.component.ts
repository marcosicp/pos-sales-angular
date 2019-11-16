import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IngresoCaja } from '../../shared/models/ingreso-caja.model';

@Component({
  selector: 'app-dialog-ingreso-caja',
  templateUrl: './dialog-ingreso-caja.component.html',
  styleUrls: ['./dialog-ingreso-caja.component.scss']
})
export class DialogIngresoCajaComponent implements OnInit {
  ingresoCaja: IngresoCaja = new IngresoCaja();

  constructor(
    public dialogRef: MatDialogRef<DialogIngresoCajaComponent>
  ) { }

  ngOnInit() {
  }

  guardar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
