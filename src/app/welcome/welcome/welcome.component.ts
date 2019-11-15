import { Component, OnInit } from '@angular/core';
import { EstadoCaja } from '../../shared/models/estado-caja.model';
import { DataService } from '../../core/services/data.service';
import { MatDialog  } from '@angular/material';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  result: EstadoCaja[]= [];
  estadoCaja: EstadoCaja = new EstadoCaja();
  usuario= '';

  constructor( private dialog: MatDialog, private comerciosService: DataService) {
    this.comerciosService.getAsync(URL_MOVIMIENTOS.GET_ESTADO, this.result).subscribe(
      data => {
        if(data[0]){
          this.estadoCaja.estado = "ABIERTA";
        }
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
          dialogRef.afterClosed().subscribe(result => {
        });
      }
    );
   }

  ngOnInit() {

  }

  verEstado() {
    try {
      if(this.estadoCaja.estado === "ABIERTA"){
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  cajaCerrada(){

  }

}
