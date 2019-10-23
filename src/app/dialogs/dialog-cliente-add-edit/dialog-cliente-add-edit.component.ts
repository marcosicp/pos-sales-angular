import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Clientes } from '../../shared/models/clientes.model';
// MOCKS
import Facturas from '../../shared/mocks/facturas.mock';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_CLIENTES } from '../../shared/configs/urls.config';
// REGEXP HELPER
import RegExpHelper from '../../shared/helpers/regex.helper';

@Component({
  selector: 'app-dialog-cliente-add-edit',
  templateUrl: './dialog-cliente-add-edit.component.html',
  styleUrls: ['./dialog-cliente-add-edit.component.scss'],
  providers: [FormGroupDirective]
})
export class DialogClienteAddEditComponent implements OnInit {
  dialogTitle: string;
  cliente: Clientes;
  result: Clientes[] = [];
  clientForm: FormGroup;
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
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogClienteAddEditComponent>,
    private dataservice: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Clientes
  ) {
    this.cliente = data || new Clientes();
    this.dialogTitle = `${data ? 'Modificar' : 'Agregar'}`;
  }

  ngOnInit() {
    this.clientForm = new FormGroup(
      {
        nombre: new FormControl(this.cliente.nombre, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        razonSocial: new FormControl(this.cliente.razonSocial, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        cuil: new FormControl(this.cliente.cuil, [Validators.required, Validators.pattern(RegExpHelper.numbers), Validators.minLength(11)]),
        telefono: new FormControl(this.cliente.telefono, [Validators.required, Validators.pattern(RegExpHelper.numbers), Validators.minLength(10)]),
        email: new FormControl(this.cliente.email, [Validators.required, Validators.email]),
        direccion: new FormControl(this.cliente.direccion, [Validators.required]),
        tipoFactura: new FormControl(this.cliente.tipoFactura, [Validators.required])
      }
    );
  }

  guardarCliente() {
    Object.keys(this.clientForm.value).forEach(
      prop => {
        this.cliente[prop] = this.clientForm.value[prop];
      }
    );

    const URL = this.data ?
      URL_CLIENTES.MODIFY_CLIENTE :
      URL_CLIENTES.ADD_CLIENTE;

    this.dataservice.createAsync(
      URL,
      this.cliente,
      this.result
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

  onNoClick() {
    this.dialogRef.close();
  }
}
