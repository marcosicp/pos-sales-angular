import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSort,MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Venta } from '../../shared/models/venta.model';
import { Proveedores } from '../../shared/models/proveedores.model';
import { DataService } from '../../core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { DialogProveedoresAddEditComponent } from '../../dialogs/dialog-proveedores-add-edit/dialog-proveedores-add-edit.component';
import { ProveedoresUrl } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit, AfterViewInit {
  private zone: NgZone;
  ventas: Venta[];
  total: number;
  productosVenta: ProductoPedido[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean;
  displayedColumns: string[] = [ 'nombre', 'telefono', 'razonsocial', 'direccion'];
  dataSource: MatTableDataSource<Venta>;
  selection = new SelectionModel<Venta>(true, []);

  constructor(private comerciosService: DataService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(ProveedoresUrl.getAll, this.productosVenta).subscribe(
      data => {
        this.ventas = data;
        this.dataSource = new MatTableDataSource<Venta>();
        this.dataSource.data = this.ventas;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit() {
    const self = this;
  }

  agregarProveedor(Producto: Proveedores) {
    const dialogRef = this.dialog.open(DialogProveedoresAddEditComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comerciosService.createAsync('Productos/NuevoProducto', result, this.comerciosService.productos).subscribe(
        next => {
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
