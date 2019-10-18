import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Clientes } from '../../shared/models/clientes.model';
import Facturas from '../../shared/models/facutas.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_CLIENTES } from '../../shared/configs/urls.config';

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
  errorString = (prop) => {
    const errorText = `Por favor complete el campo ${prop}`;
    switch (prop) {
      case 'nombre':
        return `${errorText} sólo con letras`;
      case 'email':
        return `${errorText} con el email completo (@gmail.com, por ejemplo)`;
      case 'dni':
        return `${errorText} con un mínimo de 7 caracteres numéricos`;
      case 'telefono':
        return `${errorText} con un mínimo de 10 caracteres numéricos`;
      case 'cuil':
        return `${errorText} con un mínimo de 11 caracteres numéricos`;
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
    this.cliente = data ? data : new Clientes();
    this.dialogTitle = `${data ? 'Modificar' : 'Agregar nuevo'} cliente`;
  }

  ngOnInit() {
    this.clientForm = new FormGroup(
      {
        nombre: new FormControl(this.cliente.nombre, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
        razonSocial: new FormControl(this.cliente.razonSocial, [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
        dni: new FormControl(this.cliente.dni, [Validators.minLength(7)]),
        cuil: new FormControl(this.cliente.cuil, [Validators.minLength(11)]),
        cuit: new FormControl(this.cliente.cuit, [Validators.minLength(11)]),
        telefono: new FormControl(this.cliente.telefono, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10)]),
        email: new FormControl(this.cliente.email, [Validators.required, Validators.email]),
        direccion: new FormControl(this.cliente.direccion, [Validators.required]),
        tipoFactura: new FormControl(this.cliente.tipoFactura)
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
