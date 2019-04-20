import { Component, OnInit } from '@angular/core';
import { AperturaCaja } from '../../models/apertura-caja.model';
import { MatDialogRef, MatDialog  } from '@angular/material';
import { DataService } from '../../../app/core/services/data.service';;
import { AuthService } from '../../core/auth.service';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';

@Component({
  selector: 'app-dialog-abrir-caja',
  templateUrl: './dialog-abrir-caja.component.html',
  styleUrls: ['./dialog-abrir-caja.component.scss']
})
export class DialogAbrirCajaComponent implements OnInit {
  aperturaCaja: AperturaCaja = new AperturaCaja();
  result: AperturaCaja[] = [];
  usuario= '';

  constructor(private auth: AuthService, public dialogRef: MatDialogRef<DialogAbrirCajaComponent>, private dialog: MatDialog, private comerciosService: DataService) {
    this.auth.getUser.subscribe((data: any) => {
      this.usuario = data;
    });
   }
  
  ngOnInit() {
    
  }

  guardar() {
    this.aperturaCaja.usuario =this.usuario;
    this.aperturaCaja.fechaMovimiento = new Date();
    this.aperturaCaja.fechaMovimiento.setHours(this.aperturaCaja.fechaMovimiento.getHours() - 3)
    this.aperturaCaja.tipo = "APERTURA";
    this.comerciosService.createAsync('movimientos/AbrirCaja', this.aperturaCaja, this.result).subscribe(
      data => {
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
        dialogRef.afterClosed().subscribe(result => {

        });

        this.dialogRef.close();
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
          dialogRef.afterClosed().subscribe(result => {
        });
        console.log(error);
      }
    );
  }

}
