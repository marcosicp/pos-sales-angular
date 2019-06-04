import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSort,MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Venta } from '../../shared/models/venta.model';
import { DataService } from '../../core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { DialogVerItemsPedidoComponent } from '../../dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component';
import { PedidosUrl } from '../../shared/configs/urls.config';

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
  displayedColumns: string[] = [ 'fechaPedido', 'imprimioTicket', 'responsable', 'cliente', 'total', 'veritems'];
  dataSource: MatTableDataSource<Venta>;
  selection = new SelectionModel<Venta>(true, []);

  constructor(private comerciosService: DataService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(PedidosUrl.getAll, this.productosVenta).subscribe(
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

  verItems(item){
    const dialogRef = this.dialog.open(DialogVerItemsPedidoComponent, { width: '900px',data:{ item } });
    dialogRef.afterClosed().subscribe(result => {

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
