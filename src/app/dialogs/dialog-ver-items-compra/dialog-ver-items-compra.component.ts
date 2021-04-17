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
  templateUrl: "./dialog-ver-items-compra.component.html",
  styleUrls: ["./dialog-ver-items-compra.component.scss"],
  
})
export class DialogVerItemsCompraComponent {
  dialogTitle: string;
  // productosPedido: ProductoPedido[] = [];
  item: any;
  dataSource = new MatTableDataSource<ProductoPedido>();
  displayedColumns: string[] = [
    "producto",
    "cantidad",
    "precioCompra",
    "montoFinal",
  ];
  totals: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.dialogTitle = "Listado de productos comprados";

    data.productosCompra.forEach((producto) => {
      producto["montoFinal"] = producto.precioCompra * producto.cantidadComprada;
    });

    this.dataSource.data = data.productosCompra;

    this.totals = {
      cantidadComprada: this.calculateTotal("cantidadComprada"),
      precioCompra: this.calculateTotal("precioCompra"),
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
