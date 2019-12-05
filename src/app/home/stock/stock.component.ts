import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
// MODELOS
import { Productos } from '../../shared/models/producto.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// CONFIGURACIONES
import { URL_STOCK, URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { TABLA_STOCK } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogStockAddEditComponent } from '../../dialogs/dialog-stock-add-edit/dialog-stock-add-edit.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogEditarGananciasComponent } from '../../dialogs/dialog-editar-ganancias/dialog-editar-ganancias.component';
// MOCKS
import categoriasMock from '../../shared/mocks/categorias.mock';

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
    label: 'Registrar producto',
    buttonEvent: () => this.agregarProducto()
  };
  searchButton = {
    placeHolder: this.headerTitles.map(item => this.tableHeaders[item].toLowerCase()).join(', ')
  };
  otherButtons = [
    {
      icon: 'shopping_cart',
      label: 'Registrar compra',
      buttonEvent: () => this.registrarCompra()
    }, {
      icon: 'label',
      label: 'Modificar ganancia',
      buttonEvent: () => this.editarGanancias()
    }
  ];
  proveedores: string[];
  categorias: any[];

  constructor(
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getAsync(URL_STOCK.GET_ALL, []).subscribe(
      data => {
        if (!data) {
          const dialogRef = this.dialog.open(
            DialogSinConexionComponent,
            { width: '900px',  disableClose: true}
          );

          dialogRef.afterClosed().subscribe(() => this.router.navigate(['welcome']));
        }

        this.categorias = categoriasMock;

        data.forEach(
          item => {
            item.precioVenta = item.precioCompra * (1 + ((this.categorias.find(_item => _item.nombre === item.categoria || _item.nombre === 'OTROS')).ganancia / 100))
          }
        );

        this.dataSource.data = data;
        this.columnCells.opciones = [{
          buttonIcon: 'edit',
          buttonLabel: 'Modificar',
          buttonEvent: (prod) => this.editarProducto(prod)
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

    this.dataService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe(
      data => this.proveedores = data.map(item => item.razonSocial)
    );
  }

  agregarProducto() {
    const dialogRef = this.dialog.open(
      DialogStockAddEditComponent, {
        width: '900px',
        data: {
          proveedores: this.proveedores,
          categorias: this.categorias
        }
      }
    );

    dialogRef.afterClosed().subscribe(
      newProducto => {
        if (newProducto) {
          this.loadingService.toggleLoading();

          this.dataService.createAsync(
            URL_STOCK.ADD_STOCK,
            newProducto,
            this.dataSource.data
          ).subscribe(
            result => {
              this.loadingService.toggleLoading();

              const dialogResult = this.dialog.open(
                DialogOperacionOkComponent,
                { width: '600px', disableClose: true }
              );

              dialogResult.afterClosed().subscribe(
                () => this.dataSource.data = result
              );
            },
            error => {
              this.loadingService.toggleLoading();

              this.dialog.open(
                DialogSinConexionComponent,
                { width: '600px', disableClose: true }
              );
            }
          );
        }
      }
    );
  }

  editarProducto(prod: Productos) {
    const productoMod = Object.assign({}, prod);
    const dialogRef =
      this.dialog.open(
        DialogStockAddEditComponent, {
          width: '900px',
          data: {
            producto: productoMod,
            proveedores: this.proveedores,
            categorias: this.categorias
          }
        }
      );

      dialogRef.afterClosed().subscribe(
        newProducto => {
          if (newProducto) {
            this.loadingService.toggleLoading();

            this.dataService.updateAsync(
              URL_STOCK.UPDATE_STOCK,
              newProducto,
              this.dataSource.data
            ).subscribe(
              result => {
                this.loadingService.toggleLoading();

                const dialogResult = this.dialog.open(
                  DialogOperacionOkComponent,
                  { width: '600px', disableClose: true }
                );

                dialogResult.afterClosed().subscribe(
                  () => this.dataSource.data = result
                );
              },
              error => {
                this.loadingService.toggleLoading();

                this.dialog.open(
                  DialogSinConexionComponent,
                  { width: '600px', disableClose: true }
                );
              }
            );
          }
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
          confirmText: `¿Esta seguro que desea eliminar ${prod.nombre} de la lista de productos?`
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.loadingService.toggleLoading();

        this.dataService.deleteAsync(
          URL_STOCK.DELETE_STOCK,
          prod.id,
          this.dataSource.data
        ).subscribe(
          data => {
            this.loadingService.toggleLoading();

            const dialogResult = this.dialog.open(
              DialogOperacionOkComponent,
              { width: '600px', disableClose: true }
            );

            dialogResult.afterClosed().subscribe(
              () => this.dataSource.data = data
            );
          },
          error => {
            this.loadingService.toggleLoading();

            this.dialog.open(
              DialogSinConexionComponent,
              { width: '600px', disableClose: true }
            );
          }
        );
      }
    });
  }

  editarGanancias() {
    const dialogRef = this.dialog.open(
      DialogEditarGananciasComponent, {
        width: '600px',
        disableClose: true,
        data: this.categorias
      }
    );

    dialogRef.afterClosed().subscribe(
      result => this.categorias = result || this.categorias
    );
  }

  registrarCompra() {
    this.router.navigate(['registrar-compra']);
  }
}
