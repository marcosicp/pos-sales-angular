import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_USER } from '../../shared/configs/urls.config';
// REGEXP HELPER
import RegExpHelper from '../../shared/helpers/regex.helper';

@Component({
  selector: 'app-dialog-usuario-add-edit',
  templateUrl: './dialog-usuario-add-edit.component.html',
  styleUrls: ['./dialog-usuario-add-edit.component.scss'],
  providers: [FormGroupDirective]
})
export class DialogUsuarioAddEditComponent implements OnInit {
  dialogTitle: string;
  usuario: Usuarios;
  result: Usuarios[] = [];
  repetirPass: string;
  userForm: FormGroup;
  errorString = (prop) => {
    const errorText = `Por favor complete el campo ${prop}`;
    switch (prop) {
      case 'email':
        return `${errorText} con el email completo (@gmail.com, por ejemplo)`;
      case 'telefono':
        return `${errorText} sólo con números`;
      case 'usuario':
        return `${errorText} sólo con letras sin espacios ni otros caracteres`;
      case 'contraseña':
      case 'repetir contraseña':
        return `${errorText} con un mínimo de 8 caracteres e identico entre ambos campos de contraseña`;
      default:
        return `${errorText}, es obligatorio`;
    }
  }

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogOperacionOkComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data?: Usuarios
  ) {
    this.usuario = data || new Usuarios();
    this.dialogTitle = `${data ? 'Modificar' : 'Registrar'} usuario`;
  }

  ngOnInit() {
    this.userForm = new FormGroup(this.formControlObject(), this.validatePass);
  }

  guardarUsuario() {
    for (const prop in this.userForm.value) {
      if (this.userForm.value.hasOwnProperty(prop) && prop !== 'repetirPass') {
        this.usuario[prop] = this.userForm.value[prop];
      }
    }

    const URL = this.data ?
      URL_USER.UPDATE_USER :
      URL_USER.ADD_USER;

    const ASYNC = this.data ?
      'updateAsync' :
      'createAsync';

    this.dataService[ASYNC](
      URL,
      this.usuario,
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
    this.dialogRef.close(false);
  }

  private validatePass = (userForm: AbstractControl): {[key: string]: boolean} | null => {
    if (userForm.value) {
      return userForm.value.password === userForm.value.repetirPass ?
        null : {repetirPass: true};
    }
  }

  private formControlObject() {
    return this.data ?
      {
        nombre: new FormControl(this.usuario.nombre, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        apellido: new FormControl(this.usuario.apellido, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
        telefono: new FormControl(this.usuario.telefono, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        usuario: new FormControl(this.usuario.usuario, [Validators.required, Validators.pattern(RegExpHelper.lettersOnly)]),
        admin: new FormControl(this.usuario.admin, [Validators.required])
      } : {
        nombre: new FormControl(this.usuario.nombre, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        apellido: new FormControl(this.usuario.apellido, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
        telefono: new FormControl(this.usuario.telefono, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        usuario: new FormControl(this.usuario.usuario, [Validators.required, Validators.pattern(RegExpHelper.lettersOnly)]),
        password: new FormControl(this.usuario.password, [Validators.required, Validators.minLength(8)]),
        repetirPass: new FormControl(this.repetirPass, [Validators.required, Validators.minLength(8)]),
        admin: new FormControl(this.usuario.admin, [Validators.required])
      }
  }
}
