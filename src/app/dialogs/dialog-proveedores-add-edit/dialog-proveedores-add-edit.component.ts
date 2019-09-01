import { Component, OnInit } from '@angular/core';
import { Proveedores } from '../../shared/models/proveedores.model';
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogCerrarCajaComponent } from '../dialog-cerrar-caja/dialog-cerrar-caja.component';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-dialog-proveedores-add-edit',
  templateUrl: './dialog-proveedores-add-edit.component.html',
  styleUrls: ['./dialog-proveedores-add-edit.component.scss']
})
export class DialogProveedoresAddEditComponent implements OnInit {

  proveedor: Proveedores = new Proveedores();
  result: Proveedores[] = [];

  constructor(private auth: AuthService, private dialog: MatDialog,
     public dialogRef: MatDialogRef<DialogCerrarCajaComponent>, private comerciosService: DataService) { }

  ngOnInit() {
    
  }

  guardarProveedor() {
    this.comerciosService.createAsync('proveedores/AddProveedor', this.proveedor, this.result).subscribe(
      data => {
        
        const dialogRef = this.dialog.open(DialogOperacionOkComponent, { width: '600px' });
        dialogRef.afterClosed().subscribe(result => {

        });
        
          
        this.dialogRef.close(data[0]);
      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
          dialogRef.afterClosed().subscribe(result => {
        });
        console.log(error);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
