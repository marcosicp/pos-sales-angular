import { Component, OnInit, Inject } from '@angular/core';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-editar-entrega',
  templateUrl: './dialog-editar-entrega.component.html',
  styleUrls: ['./dialog-editar-entrega.component.scss']
})
export class DialogEditarEntregaComponent implements OnInit {
  modalData: any;

  constructor(public dialogRef: MatDialogRef<DialogEditarEntregaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this. modalData = data;
  }

  ngOnInit() {

  }

  close(confirm: boolean) {
    this.dialogRef.close({confirm: confirm});
  }

}
