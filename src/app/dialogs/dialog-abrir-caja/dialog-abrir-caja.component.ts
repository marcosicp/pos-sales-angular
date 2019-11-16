import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
// MODELOS
import { AperturaCaja } from '../../shared/models/apertura-caja.model';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
// REGEXP HELPER
import RegExpHelper from '../../shared/helpers/regex.helper';

@Component({
  selector: 'app-dialog-abrir-caja',
  templateUrl: './dialog-abrir-caja.component.html',
  styleUrls: ['./dialog-abrir-caja.component.scss'],
  providers: [FormGroupDirective]
})
export class DialogAbrirCajaComponent implements OnInit {
  aperturaCaja: AperturaCaja = new AperturaCaja();
  result: AperturaCaja[] = [];
  usuario;
  abrirCajaForm: FormGroup;
  errorString = (prop: string) => {
    const errorMsj = prop === 'monto' ?
      ' sólo con números' : ', es obligatorio';
    return `Por favor complete el campo ${prop.toLocaleUpperCase()}${errorMsj}`;
  }

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogAbrirCajaComponent>
  ) { }

  ngOnInit() {
    this.authService.getUser.subscribe((data: any) => {
      this.usuario = data;
    });

    this.abrirCajaForm = new FormGroup(
      {
        monto: new FormControl(this.aperturaCaja.monto, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        descripcion: new FormControl(this.aperturaCaja.descripcion, [Validators.required])
      }
    );
  }

  guardar() {
    const otrosDatos = {
      usuario: this.usuario,
      fechaMovimiento: new Date(),
      tipo: 'APERTURA'
    };

    Object.keys(this.aperturaCaja).forEach(
      prop => this.aperturaCaja[prop] = this.abrirCajaForm.value[prop] || otrosDatos[prop] || null
    );

    this.dialogRef.close(this.aperturaCaja);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
