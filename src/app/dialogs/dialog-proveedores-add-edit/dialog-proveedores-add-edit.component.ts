import { Component, OnInit, Inject } from '@angular/core';
import { Proveedores } from '../../shared/models/proveedores.model';
import { FormControl, Validators } from '@angular/forms';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogCerrarCajaComponent } from '../dialog-cerrar-caja/dialog-cerrar-caja.component';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-dialog-proveedores-add-edit',
  templateUrl: './dialog-proveedores-add-edit.component.html',
  styleUrls: ['./dialog-proveedores-add-edit.component.scss']
})
export class DialogProveedoresAddEditComponent implements OnInit {
  dialogTitle: string;
  proveedor: Proveedores;
  // result: Proveedores[] = [];

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCerrarCajaComponent>,
    private comerciosService: DataService
  ) {
    this.proveedor = data || new Proveedores();
    this.dialogTitle = `${data ? 'Modificar' : 'Registrar'} proveedor`;
  }

  ngOnInit() {

  }

  guardarProveedor() {

    this.dialogRef.close(this.proveedor);

  }

  inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      // invalid character, prevent input

    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
