import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
import { MovimientosCaja } from '../../shared/models/movimientos-caja.model';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../../app/core/services/data.service';
// URLS
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';
// HELPERS
import RegExpHelper from '../../shared/helpers/regex.helper';
// DIALOGOS
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';


@Component({
  selector: 'app-dialog-cerrar-caja',
  templateUrl: './dialog-cerrar-caja.component.html',
  styleUrls: ['./dialog-cerrar-caja.component.scss'],
  providers: [FormGroupDirective]
})
export class DialogCerrarCajaComponent implements OnInit {
  cierreCaja: MovimientosCaja = new MovimientosCaja();
  aperturaCaja: MovimientosCaja = new MovimientosCaja();
  aperturas: MovimientosCaja[] = [];
  totalCierreCaja: number;
  usuario: Usuarios;
  cerrarCajaForm: FormGroup;
  errorString = (prop: string) => {
    const errorMsj = prop === 'monto' ?
      ' sólo con números y hasta 2 decimales' : ', es obligatorio';
    return `Por favor complete el campo ${prop.toLocaleUpperCase()}${errorMsj}`;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private comerciosService: DataService,
    public dialogRef: MatDialogRef<DialogCerrarCajaComponent>,
    private dialog: MatDialog
  ) {
    this.authService.getUser.subscribe((data: any) => {
      this.usuario = JSON.parse(data);
    });
  }

  ngOnInit() {
    this.comerciosService.getAsync(
      URL_MOVIMIENTOS.GET_ULTIMA_APERTURA,
      []
    ).subscribe(
      result => {
        if (!result) {
          const dialogRef = this.dialog.open(
            DialogSinConexionComponent,
            { width: '900px',  disableClose: true}
          );

          dialogRef.afterClosed().subscribe(() => this.router.navigate(['welcome']));
        }

        this.aperturaCaja.monto = result[0];
      }
    );

    this.cerrarCajaForm = new FormGroup(
      {
        monto: new FormControl(this.cierreCaja.monto, [Validators.required, Validators.pattern(RegExpHelper.numberDecimals)]),
        descripcion: new FormControl(this.cierreCaja.descripcion, [Validators.required])
      }
    );
  }

  cerrarCaja() {
    const otrosDatos = {
      usuario: this.usuario,
      tipo: 'CIERRE'
    };

    this.cierreCaja = {...this.cerrarCajaForm.value, ...otrosDatos};

    this.dialogRef.close(this.cierreCaja);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
