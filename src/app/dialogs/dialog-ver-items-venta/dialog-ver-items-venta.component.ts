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
  dialogTitle: string;
  productosPedido: ProductoPedido[] = [];
  item: any;
  dataSource = new MatTableDataSource<ProductoPedido>();
  displayedColumns: string[] = ['producto', 'cantidad', 'peso', 'precioVenta'];
  totals: any;

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
    const estado = data.estado === 'CONFIRMADO';
    this.dialogTitle = `Listado de productos ${estado ? 'vendidos' : 'pedidos'}`;

    this.dataSource.data = data.productosPedidos;

    this.totals = {
      cantidad: this.calculateTotal('cantidad'),
      peso: this.calculateTotal('peso'),
      precioVenta: this.calculateTotal('precioVenta')
    };
  }

  cerrar() {
    this.dialogRef.close(false);
  }

  private calculateTotal(property: string) {
    return this.dataSource.data.reduce(
      (accumulator, currentVal) => (accumulator[property] || 0) + currentVal[property]
    );
  }
}
