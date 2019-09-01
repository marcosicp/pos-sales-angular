import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSort,MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Venta } from '../shared/models/venta.model';
import { ProductoPedido } from '../shared/models/producto-venta.model';
import { URL_VENTAS } from '../shared/configs/urls.config';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../core/services/data.service';
import { DialogVerItemsPedidoComponent } from '../dialogs/dialog-ver-items-venta/dialog-ver-items-venta.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  private zone: NgZone;
  ventas: Venta[];
  total: number;
  productosVenta: ProductoPedido[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean;
  displayedColumns: string[] = [ 'creado', 'imprimioTicket', 'responsable', 'cliente', 'total', 'estado', 'veritems', 'confirmar'];
  dataSource: MatTableDataSource<Venta>;
  selection = new SelectionModel<Venta>(true, []);

  constructor(private router: Router, private comerciosService: DataService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(URL_VENTAS.GET_ALL, this.productosVenta).subscribe(
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

  public onTap(element: Venta) {
    let navigationExtras: NavigationExtras = {
        queryParams: { pedido: JSON.stringify(element)} 
    };
    
    this.router.navigate(["confirmacion"], navigationExtras);
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
