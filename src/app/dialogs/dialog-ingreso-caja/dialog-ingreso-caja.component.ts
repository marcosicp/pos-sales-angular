import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
import { MovimientosCaja } from '../../shared/models/movimientos-caja.model';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
// HELPERS
import getFechaArg from '../../shared/helpers/date.helper';

@Component({
  selector: 'app-dialog-ingreso-caja',
  templateUrl: './dialog-ingreso-caja.component.html',
  styleUrls: ['./dialog-ingreso-caja.component.scss']
})
export class DialogIngresoCajaComponent implements OnInit {
  ingresoCaja: MovimientosCaja = new MovimientosCaja();
  usuario: Usuarios;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DialogIngresoCajaComponent>
  ) {
    this.authService.getUser.subscribe((data: any) => {
      this.usuario = JSON.parse(data);
    });
  }

  ngOnInit() {
  }

  guardar() {
    const otrosDatos = {
      usuario: this.usuario,
      fechaMovimiento: getFechaArg(),
      tipo: 'DEPOSITO'
    };

    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
