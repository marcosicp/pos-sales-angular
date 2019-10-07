import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Productos } from '../../shared/models/producto.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_PRODUCTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-dialog-stock-add-edit',
  templateUrl: './dialog-stock-add-edit.component.html',
  styleUrls: ['./dialog-stock-add-edit.component.scss']
})
export class DialogStockAddEditComponent {
  producto: Productos;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogOperacionOkComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Productos
  ) {
    this.producto = data ? data : new Productos();
  }

  guardar() {
    const URL = this.data ?
      URL_PRODUCTOS.MODIFY_STOCK :
      URL_PRODUCTOS.ADD_STOCK;

    this.dataService.createAsync(
      URL,
      this.producto,
      []
    ).subscribe(
      result => {
        const DialogResult = result ?
          DialogOperacionOkComponent :
          DialogSinConexionComponent;
        const response = result ?
          result[0] : false;

        const _dialogRef = this.dialog.open(
          DialogResult,
          { width: '600px' }
        );

        _dialogRef.afterOpened().subscribe(
          () => {
            this.dialogRef.close(response);
          }
        );
      }
    );
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
