import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef } from '@angular/material';
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
  displayedColumns: string[] = ['producto', 'cantidad', 'peso', 'precioVenta', 'montoNeto', 'iva', 'montoTotal'];
  totals: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const estado = data.estado === 'CONFIRMADO';
    this.dialogTitle = `Listado de productos ${estado ? 'vendidos' : 'pedidos'}`;

    data.productosPedidos.forEach(
      producto => {
        producto['montoTotal'] = producto.precioVenta * producto.cantidad;
        producto['iva'] = producto.montoTotal * 0.21;
        producto['montoNeto'] = producto.montoTotal - producto.iva;
      }
    );

    this.dataSource.data = data.productosPedidos;

    this.totals = {
      cantidad: this.calculateTotal('cantidad'),
      peso: this.calculateTotal('peso'),
      precioVenta: this.calculateTotal('precioVenta'),
      montoNeto: this.calculateTotal('montoNeto'),
      iva: this.calculateTotal('iva'),
      montoTotal: this.calculateTotal('montoTotal'),
    };
    console.warn('totales', this.totals)
  }

  cerrar() {
    this.dialogRef.close(false);
  }

  private calculateTotal = (property: string) =>
    this.dataSource.data.map(item => item[property]).reduce((acumulador, valor) => acumulador + valor)
}
