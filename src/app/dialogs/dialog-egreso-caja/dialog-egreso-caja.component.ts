import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
import { MovimientosCaja } from '../../shared/models/movimientos-caja.model';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
// HELPERS
import RegExpHelper from '../../shared/helpers/regex.helper';
import getFechaArg from '../../shared/helpers/date.helper';

@Component({
  selector: 'app-dialog-egreso-caja',
  templateUrl: './dialog-egreso-caja.component.html',
  styleUrls: ['./dialog-egreso-caja.component.scss']
})
export class DialogEgresoCajaComponent implements OnInit {
  retiroCaja: MovimientosCaja = new MovimientosCaja();
  usuario: Usuarios;
  retiroForm: FormGroup;
  errorString = (prop: string) => {
    const errorMsj = prop === 'monto' ?
      ' sólo con números' : ', es obligatorio';
    return `Por favor complete el campo ${prop.toLocaleUpperCase()}${errorMsj}`;
  }

  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<DialogEgresoCajaComponent>
  ) {
    this.auth.getUser.subscribe((data: any) => {
      this.usuario = JSON.parse(data);
    });
  }

  ngOnInit() {
    this.retiroForm = new FormGroup(
      {
        monto: new FormControl(this.retiroCaja.monto, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        descripcion: new FormControl(this.retiroCaja.descripcion)
      }
    );
  }

  guardar() {
    const otrosDatos = {
      usuario: this.usuario,
      tipo: 'RETIRO'
    };

    this.retiroCaja = {...this.retiroForm.value, ...otrosDatos};

    this.dialogRef.close(this.retiroCaja);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
