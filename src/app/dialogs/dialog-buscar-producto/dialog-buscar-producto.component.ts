import { OnInit, Component } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { DataService } from '../../../app/core/services/data.service';;
import { Productos } from '../../shared/models/producto.model';
import { URL_STOCK } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-dialog-buscar-producto',
  templateUrl: 'dialog-buscar-producto.component.html',
  styleUrls: ['dialog-buscar-producto.component.scss']
})
export class DialogBuscarProductoComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'producto', 'cantidad', 'precioVenta'];
  productos: MatTableDataSource<Productos>;

  constructor(public dialogRef: MatDialogRef<DialogBuscarProductoComponent>, private comerciosService: DataService) { }

  ngOnInit() {
    if (this.comerciosService.productos && this.comerciosService.productos.length) {
      this.productos = new MatTableDataSource(this.comerciosService.productos);
    } else {
      this.comerciosService.getAsync(URL_STOCK.GET_ALL, this.comerciosService.productos)
        .subscribe( data => {
          this.productos = new MatTableDataSource(data);
        });
    }
  }

  applyFilter(filterValue: string) {
    this.productos.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  selectRow(row) {
    this.dialogRef.close(row);
  }
}
