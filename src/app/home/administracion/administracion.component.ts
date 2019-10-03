import { Component, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { DataService } from '../../core/services/data.service';
import { DialogCerrarCajaComponent } from '../../dialogs/dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DialogAbrirCajaComponent } from '../../dialogs/dialog-abrir-caja/dialog-abrir-caja.component';
import { DialogIngresoCajaComponent } from '../../dialogs/dialog-ingreso-caja/dialog-ingreso-caja.component';
import { DialogEgresoCajaComponent } from '../../dialogs/dialog-egreso-caja/dialog-egreso-caja.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  constructor(private comerciosService: DataService, private dialog: MatDialog) {

  }

  ngOnInit() {
  }

  abrirCaja() {
    const dialogRef = this.dialog.open(DialogAbrirCajaComponent,
      {
        width: '600px' ,  disableClose: true
      });

    dialogRef.afterClosed().subscribe(
      result => {

      }
    );
  }

  cerrarCaja() {
      const dialogRef = this.dialog.open(DialogCerrarCajaComponent,
        {
          width: '600px' ,  disableClose: true
        });

      dialogRef.afterClosed().subscribe(
        result => {

        }
      );
  }

  egreso() {
    const dialogRef = this.dialog.open(DialogEgresoCajaComponent,
      {
        width: '600px' ,  disableClose: true
      });

    dialogRef.afterClosed().subscribe(
      result => {

      }
    );
  }

  ingreso() {
    const dialogRef = this.dialog.open(DialogIngresoCajaComponent,
      {
        width: '600px' ,  disableClose: true
      });

    dialogRef.afterClosed().subscribe(
      result => {

      }
    );
  }
}
