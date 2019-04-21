import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../../app/core/services/data.service';
import { ProductoVenta } from '../../shared/models/producto-venta.model';
import { MAT_DIALOG_DATA, MatTableDataSource } from '../../../../node_modules/@angular/material';


@Component({
  selector: 'app-dialog-ver-items-venta',
  templateUrl: './dialog-ver-items-venta.component.html',
  styleUrls: ['./dialog-ver-items-venta.component.scss']
})
export class DialogVerItemsVentaComponent implements OnInit {
  productosVenta: ProductoVenta[] = [];
  item: any;
  dataSource = new MatTableDataSource<ProductoVenta>();
  displayedColumns: string[] = ['producto', 'cantidad', 'precioVenta'];

  constructor(private comerciosService: DataService,  @Inject(MAT_DIALOG_DATA) public data: any) {
    debugger;
    this.comerciosService.getAsync('ventas/productosVenta?id=' + data.item.id, this.productosVenta).subscribe(
      data => {
        // this.productosVenta.forEach(function(item) {
          this.dataSource.data = this.productosVenta;
        // });
      }
    );

  }

  ngOnInit() {
  }

}
