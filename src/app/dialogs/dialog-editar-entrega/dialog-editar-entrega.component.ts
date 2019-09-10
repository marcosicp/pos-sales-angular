import { Component, OnInit, Inject } from '@angular/core';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatFormFieldControl, MatInputModule } from '@angular/material';
import { FormControl } from '@angular/forms';

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

  constructor(public dialogRef: MatDialogRef<DialogEditarEntregaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.evento = data;
  }

  ngOnInit() {

  }

  guardarEnvio() {
    this.dialogRef.close({ evento: this.evento });
  }
}
