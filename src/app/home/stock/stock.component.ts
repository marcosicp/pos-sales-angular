import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatButtonToggle } from '@angular/material';
// ENTIDADES
import { Productos } from '../../shared/models/producto.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// DIALOGOS
import { DialogStockAddEditComponent } from '../../dialogs/dialog-stock-add-edit/dialog-stock-add-edit.component';
import { DialogStockAumentarComponent } from '../../dialogs/dialog-stock-aumentar/dialog-stock-aumentar.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
// CONFIGURACIONES
import { URL_PRODUCTOS, URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { TABLA_STOCK } from '../../shared/configs/table.config';
// MOCKS
import mocks from '../../shared/mocks/stock.mock';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  tableTitle = TABLA_STOCK.title;
  dataSource = new MatTableDataSource<Productos>();
  headerTitles = Object.keys(TABLA_STOCK.cells);
  tableHeaders = TABLA_STOCK.headers;
  columnCells = TABLA_STOCK.cells;
  formatTableCells = TABLA_STOCK.format;
  isLoading: boolean;
  addButton = {
    buttonEvent: () => this.agregarProducto()
  };
  searchButton = {
    placeHolder: this.headerTitles.map(item => item.toLowerCase()).join(', '),
  };
  proveedores: string[];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getAsync(URL_PRODUCTOS.GET_ALL, []).subscribe(
      data => {
        this.dataSource.data = data;
        this.columnCells.opciones = [{
          buttonIcon: 'edit',
          buttonLabel: 'Modificar',
          buttonEvent: (prod) => this.editarProducto(prod)
        }, {
          buttonIcon: 'add',
          buttonLabel: 'Agregar stock',
          buttonEvent: (prod) => this.cambiarStock(prod)
        }, {
          buttonIcon: 'delete',
          buttonLabel: 'Eliminar',
          buttonEvent: (prod) => this.eliminarProducto(prod)
        }];
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );

    // USAR SOLO EN CASO DE NECESITAR MOCKS
    // this.dataSource.data = mocks;
    // this.columnCells.opciones = [{
    //   buttonIcon: 'edit',
    //   buttonLabel: 'Modificar',
    //   buttonEvent: (prod) => this.editarProducto(prod)
    // }, {
    //   buttonIcon: 'add',
    //   buttonLabel: 'Agregar stock',
    //   buttonEvent: (prod) => this.cambiarStock(prod)
    // }, {
    //   buttonIcon: 'delete',
    //   buttonLabel: 'Eliminar',
    //   buttonEvent: (prod) => this.eliminarProducto(prod)
    // }];

    this.dataService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe(
      data => this.proveedores = data.map(item => item.razonSocial)
    );
  }

  agregarProducto() {
    this.dialog.open(
      DialogStockAddEditComponent, {
        width: '900px',
        data: {
          proveedores: this.proveedores
        }
      }
    );
  }

  editarProducto(prod: Productos) {
    this.dialog.open(
      DialogStockAddEditComponent, {
        width: '900px',
        data: {
          producto: prod,
          proveedores: this.proveedores
        }
      }
    );
  }

  cambiarStock(prod: Productos) {
    this.dialog.open(
      DialogStockAumentarComponent, {
        width: '900px',
        data: prod
      }
    );
  }

  eliminarProducto(prod: Productos) {
    const dialogRef = this.dialog.open(
      DialogConfirmarComponent,
      {
        width: '900px',
        data: {
          title: 'Eliminar producto',
          confirmText: 'Esta seguro que desea eliminar este producto?'
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.dataService.deleteAsync(URL_PRODUCTOS.DELETE_STOCK, prod.id, []).subscribe(
          data => {
              this.dataSource.data = data;
              this.isLoading = false;
          }
        );
      }
    });
  }
}
