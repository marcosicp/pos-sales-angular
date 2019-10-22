import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Proveedores } from '../../shared/models/proveedores.model';
// MOCKS
import Facturas from '../../shared/mocks/facturas.mock';
// DIALOGOS
import { DialogCerrarCajaComponent } from '../dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// REGEX
import RegExpHelper from '../../shared/helpers/regex.helper';

@Component({
  selector: 'app-dialog-proveedores-add-edit',
  templateUrl: './dialog-proveedores-add-edit.component.html',
  styleUrls: ['./dialog-proveedores-add-edit.component.scss']
})
export class DialogProveedoresAddEditComponent implements OnInit {
  dialogTitle: string;
  proveedor: Proveedores;
  // result: Proveedores[] = [];
  proveedoresForm: FormGroup;
  facturas = Facturas;
  errorString = (prop: string) => {
    const errorText = `Por favor complete el campo ${prop.toLocaleUpperCase()}`;
    switch (prop) {
      case 'nombre':
        return `${errorText} sólo con letras`;
      case 'email':
        return `${errorText} con el email completo (@gmail.com, por ejemplo)`;
      case 'telefono':
        return `${errorText} con un mínimo de 10 números (sin puntos, letras ni otros caracteres)`;
      case 'cuil':
        return `${errorText} con un mínimo de 11 números (sin puntos, letras ni otros caracteres)`;
      default:
        return `${errorText}, es obligatorio`;
    }
  }

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Proveedores,
    public dialogRef: MatDialogRef<DialogCerrarCajaComponent>,
    private comerciosService: DataService
  ) {
    this.proveedor = data || new Proveedores();
    this.dialogTitle = `${data ? 'Modificar' : 'Agregar'}`;
  }

  ngOnInit() {
    this.proveedoresForm = new FormGroup(
      {
        nombre: new FormControl(this.proveedor.nombre, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        razonSocial: new FormControl(this.proveedor.razonSocial, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        cuil: new FormControl(this.proveedor.cuil, [Validators.required, Validators.pattern(RegExpHelper.numbers), Validators.minLength(11)]),
        telefono: new FormControl(this.proveedor.telefono, [Validators.required, Validators.pattern(RegExpHelper.numbers), Validators.minLength(10)]),
        email: new FormControl(this.proveedor.email, [Validators.required, Validators.email]),
        direccion: new FormControl(this.proveedor.direccion, [Validators.required]),
        tipoFactura: new FormControl(this.proveedor.tipoFactura, [Validators.required])
      }
    );
  }

  guardarProveedor() {
    this.dialogRef.close(this.proveedor);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
