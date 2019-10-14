import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef } from '@angular/material';
// SERVICIOS
import { DataService } from '../../../app/core/services/data.service';
// MODELOS
import { ProductoPedido } from '../../shared/models/producto-venta.model';

@Component({
  selector: 'app-dialog-ver-items-venta',
  templateUrl: './dialog-ver-items-venta.component.html',
  styleUrls: ['./dialog-ver-items-venta.component.scss']
})
export class DialogVerItemsPedidoComponent {
  productosPedido: ProductoPedido[] = [];
  item: any;
  dataSource = new MatTableDataSource<ProductoPedido>();
  displayedColumns: string[] = ['producto', 'cantidad', 'precioVenta'];

  constructor(
    private comerciosService: DataService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.comerciosService.getAsync('ventas/productosPedido?id=' + data.item.id, this.productosPedido).subscribe(
    //   data => {
    //     // this.productosPedido.forEach(function(item) {
    //       this.dataSource.data = this.productosPedido;
    //     // });
    //   }
    // );

    // this.dataSource.data = this.productosPedido;
    this.dataSource.data = data.productosPedidos;
  }

  cerrar() {
    this.dialogRef.close(false);
  }

}
