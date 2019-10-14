import { Component, OnInit, ChangeDetectorRef, ViewChild  } from '@angular/core';
import { MatDialog, MatTableDataSource, MatTable } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// ENTIDADES
// import { Venta } from '../../shared/models/venta.model';
import { Proveedores } from '../../shared/models/proveedores.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// CONFIGURACIONES
import { URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { TABLA_PROVEEDORES } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogProveedoresAddEditComponent } from '../../dialogs/dialog-proveedores-add-edit/dialog-proveedores-add-edit.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  tableTitle = TABLA_PROVEEDORES.title;
  dataSource = new MatTableDataSource<Proveedores>();
  headerTitles = Object.keys(TABLA_PROVEEDORES.cells);
  tableHeaders = TABLA_PROVEEDORES.headers;
  columnCells = TABLA_PROVEEDORES.cells;
  formatTableCells = TABLA_PROVEEDORES.format;
  isLoading: boolean;
  addButton = {
    label: 'Agregar proveedor',
    buttonEvent: () => this.agregarProveedor()
  };
  searchButton = {
    placeHolder: 'nombre, cuil, teléfono, dirección',
  };

  constructor(
    private comerciosService: DataService, private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.isLoading = true;
    this.comerciosService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe(
      data => {
        this.dataSource.data = data;
        this.columnCells.opciones = [{
          buttonLabel: 'Modificar',
          buttonEvent: (proveedor) => this.editarProveedor(proveedor)
        },
        {
          buttonLabel: 'Eliminar',
          buttonEvent: (proveedor) => this.eliminarProveedor(proveedor)
        }];
        this.isLoading = false;
      }
    );
  }

  agregarProveedor() {
    const dialogRef = this.dialog.open(DialogProveedoresAddEditComponent, {
      width: '900px' ,  disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comerciosService.createAsync('proveedores/AddProveedor', result, this.dataSource.data).subscribe(
          data => {
            this.dataSource.data = data;
          },
          error => {
            const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
              dialogRef.afterClosed().subscribe(result => {
            });
            console.log(error);
          }
        );
      }
    });
  }

  editarProveedor(proveedor: Proveedores) {
    // MANDO UNA COPIA DEL OBJETO PARA NO TENER QUE HACER UN REFRESH DE LA GRILLA
    const obj2:any = Object.assign({}, proveedor);

    const dialogRef = this.dialog.open(DialogProveedoresAddEditComponent, {
      width: '900px' ,  disableClose: true, data: obj2
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comerciosService.updateAsync('proveedores/UpdateProveedor', result, this.dataSource.data).subscribe(
          data => {
            this.dataSource.data = data;
          },
          error => {
            const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' ,  disableClose: true });
              dialogRef.afterClosed().subscribe(result => {
            });
            console.log(error);
          }
        );
      }
    });
  }

  eliminarProveedor(proveedor: Proveedores) {
    const dialogRef = this.dialog.open(DialogConfirmarComponent, {
      width: '900px' ,  disableClose: true, data: {title: 'Eliminar Proveedor', confirmText: 'Esta seguro que desear eliminar este proveedor?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.comerciosService.deleteAsync(URL_PROVEEDORES.DELETE_PROVEEDOR, proveedor.id, this.dataSource.data).subscribe(
          data => {
            debugger;
              this.dataSource.data = data;
              this.isLoading = false;
          }
        );
      }
    });
  }
}
