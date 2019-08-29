import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSort,MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Venta } from '../../shared/models/venta.model';
import { Proveedores } from '../../shared/models/proveedores.model';
import { DataService } from '../../core/services/data.service';
import { DialogProveedoresAddEditComponent } from '../../dialogs/dialog-proveedores-add-edit/dialog-proveedores-add-edit.component';
import { URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit, AfterViewInit {
  private zone: NgZone;
  // proveedores: Proveedores[];
  total: number;
  proveedores: Proveedores[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean;
  displayedColumns: string[] = [ 'nombre', 'telefono', 'razonSocial', 'direccion','eliminar', 'editar'];
  dataSource: MatTableDataSource<Proveedores>;
  selection = new SelectionModel<Proveedores>(true, []);

  constructor(private comerciosService: DataService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(URL_PROVEEDORES.GET_ALL, this.proveedores).subscribe(
      data => {
        this.proveedores = data;
        this.dataSource = new MatTableDataSource<Proveedores>();
        this.dataSource.data = this.proveedores;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit() {
    const self = this;
  }

  agregarProveedor() {
    const dialogRef = this.dialog.open(DialogProveedoresAddEditComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
   
    });
  }

  eliminarProveedor(proveedor: Proveedores) {
    const dialogRef = this.dialog.open(DialogConfirmarComponent, {
      width: '900px', data: {title: "Eliminar Proveedor", confirmText: "Esta seguro que desear eliminar este proveedor?"} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comerciosService.deleteAsync(URL_PROVEEDORES.DELETE_PROVEEDOR, proveedor.id, this.proveedores).subscribe(
          data => {
              this.dataSource = new MatTableDataSource<Proveedores>();
              this.dataSource.data = this.proveedores;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.isLoading = false; 
          }
        );
      }
    });
  }
}
