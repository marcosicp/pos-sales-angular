import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../../app/core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { MAT_DIALOG_DATA, MatTableDataSource } from '../../../../node_modules/@angular/material';


@Component({
  selector: 'app-dialog-ver-items-venta',
  templateUrl: './dialog-ver-items-venta.component.html',
  styleUrls: ['./dialog-ver-items-venta.component.scss']
})
export class DialogVerItemsPedidoComponent implements OnInit {
  productosPedido: ProductoPedido[] = [];
  item: any;
  dataSource = new MatTableDataSource<ProductoPedido>();
  displayedColumns: string[] = ['producto', 'cantidad', 'precioVenta'];

  constructor(private comerciosService: DataService,  @Inject(MAT_DIALOG_DATA) public data: any) {
    ;
    // this.comerciosService.getAsync('ventas/productosPedido?id=' + data.item.id, this.productosPedido).subscribe(
    //   data => {
    //     // this.productosPedido.forEach(function(item) {
    //       this.dataSource.data = this.productosPedido;
    //     // });
    //   }
    // );

    this.dataSource.data = this.productosPedido;
    this.dataSource.data = data.pedido.productosPedidos;
  }

  ngOnInit() {
  }

}
