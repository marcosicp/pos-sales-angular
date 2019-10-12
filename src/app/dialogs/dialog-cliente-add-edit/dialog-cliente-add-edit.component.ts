import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Clientes } from '../../shared/models/clientes.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_CLIENTES } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-dialog-cliente-add-edit',
  templateUrl: './dialog-cliente-add-edit.component.html',
  styleUrls: ['./dialog-cliente-add-edit.component.scss']
})
export class DialogClienteAddEditComponent {
  cliente: Clientes;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogClienteAddEditComponent>,
    private dataservice: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Clientes
  ) {
    this.cliente = data ? data : new Clientes();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  guardarCliente() {
    const URL = this.data ?
      URL_CLIENTES.MODIFY_CLIENTE :
      URL_CLIENTES.ADD_CLIENTE;

      this.dataservice.createAsync(
        URL,
        this.cliente,
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
}
