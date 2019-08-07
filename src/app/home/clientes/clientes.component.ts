import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSort,MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Venta } from '../../shared/models/venta.model';
import { DataService } from '../../core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { URL_CLIENTES } from '../../shared/configs/urls.config';
import { DialogClienteAddEditComponent } from '../../dialogs/dialog-cliente-add-edit/dialog-cliente-add-edit.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  private zone: NgZone;
  ventas: Venta[];
  total: number;
  productosVenta: ProductoPedido[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean;
  displayedColumns: string[] = [ 'creado', 'activo', 'telefono', 'nombre', 'email'];
  dataSource: MatTableDataSource<Venta>;
  selection = new SelectionModel<Venta>(true, []);

  constructor(private comerciosService: DataService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(URL_CLIENTES.GET_ALL, this.productosVenta).subscribe(
      data => {
        ;
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


  agregarCliente() {
    const dialogRef = this.dialog.open(DialogClienteAddEditComponent, {
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
