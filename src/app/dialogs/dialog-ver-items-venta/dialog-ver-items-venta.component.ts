import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialogRef,
} from "@angular/material";
// MODELOS
import { ProductoPedido } from "../../shared/models/producto-venta.model";

@Component({
  selector: "app-dialog-ver-items-venta",
  templateUrl: "./dialog-ver-items-venta.component.html",
  styleUrls: ["./dialog-ver-items-venta.component.scss"],
  
})
export class DialogVerItemsPedidoComponent {
  dialogTitle: string;
  productosPedido: ProductoPedido[] = [];
  item: any;
  dataSource = new MatTableDataSource<ProductoPedido>();
  displayedColumns: string[] = [
    "producto",
    "cantidad",
    "precioVenta",
    "montoFinal",
  ];
  totals: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const estado = data.estado === "CONFIRMADO";
    this.dialogTitle = `Listado de productos ${
      estado ? "vendidos" : "pedidos"
    }`;

    data.productosPedidos.forEach((producto) => {
      // producto['pesoTotal'] = producto.cantidad * producto.peso;
      producto["montoFinal"] = producto.precioVenta * producto.cantidad;
      // producto['iva'] = producto.montoFinal * 0.21;
      // producto['montoNeto'] = producto.montoFinal - producto.iva;
    });

    this.dataSource.data = data.productosPedidos;

    this.totals = {
      cantidad: this.calculateTotal("cantidad"),
      precioVenta: this.calculateTotal("precioVenta"),
      // pesoTotal: this.calculateTotal('pesoTotal'),
      // montoNeto: this.calculateTotal('montoNeto'),
      // iva: this.calculateTotal('iva'),
      montoFinal: this.calculateTotal("montoFinal"),
    };
  }

  cerrar() {
    this.dialogRef.close(false);
  }

  private calculateTotal = (property: string) =>
    this.dataSource.data
      .map((item) => item[property])
      .reduce((acumulador, valor) => acumulador + valor);
}
