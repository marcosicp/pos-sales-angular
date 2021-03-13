import { Component, OnInit, Inject } from '@angular/core';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl, MatInputModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Venta } from '../../shared/models/venta.model';

@Component({
  selector: 'app-dialog-editar-entrega',
  templateUrl: './dialog-editar-entrega.component.html',
  styleUrls: ['./dialog-editar-entrega.component.scss']
})
export class DialogEditarEntregaComponent implements OnInit {
  evento: any;
  date = new FormControl(new Date());
  direccion: Text;
  observacion: Text;
  fecha: Date;
  venta = new Venta;
  entregaRealizada: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.venta = data.venta;
  }

  ngOnInit() {

  }

  guardarEnvio() {
    this.dialogRef.close({ venta: this.venta });
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  setDateToday(): Date {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
}
