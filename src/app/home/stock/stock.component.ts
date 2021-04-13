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
  /*
    TABLETITLE: TITULO DE LA TABLA
    DATASOURCE: EL CONJUNTO DE DATOS QUE SE MOSTRARA EN LA TABLE
    HEADERTITLES: LOS NOMBRES DE LAS COLUMNAS QUE SE USARAN COMO RELACION PARA CREAR CADA UNA
    TABLEHEADERS: LOS TITULOS DE CADA COLUMNA, HACIENDO REFERENCIA LA DATO QUE SE VA A MOSTRAR
    COLUMNCELLS: EL CONJUNTO DE PROPIEDADES DEL OBJETO (PUEDE SER UNA PROPIEDAD O LA PROPIEDAD DENTRO DE UN OBJETO QUE RESULTA SER OTRA PROPEIDAD)
    FORMATTABLECELLS: EL CONJUNTO DE FORMATOS QUE LLEVARA CADA PROPIEDAD PARA MOSTRARSE DE UNA FORMA AL USUARIO
    ISLOADING: USADO PARA MOSTRAR LA ANIMACION AL USUARIO MIENTRAS SUCEDE LA CARGA DE DATOS
  */
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
  // otherButtons = [
  //   {
  //     icon: 'shopping_cart',
  //     label: 'Registrar compra',
  //     buttonEvent: () => this.registrarCompra()
  //   },
  //   // {
  //   //   icon: 'label',
  //   //   label: 'Modificar ganancia',
  //   //   buttonEvent: () => this.editarGanancias()
  //   // }
  // ];
  proveedores: string[];
  categorias: any[];

  constructor(
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog,
    private loadingService: LoadingService
  ) { }

  /*
      CUANDO SE TERMINA LA LLAMADA A LA API, SE FIJA QUE HAYA TRAIDO DATOS
    EN CASO DE NO TRAER DATOS (DEVUELVA UN VALOR COMO NULL O UNDEFINED),
    SE MUESTRA AL USUARIO UNA ADVERTENCIA QUE NO HAY CONEXION A INTERNET
      EN CASO DE FUNCIONAR, SE ASIGNA LOS DATOS TRAIDOS DE LA API Y SE CREAN
    LOS BOTONES ADICIONALES CON SU FUNCION PARA MOSTRARSE Y LA LOGICA QUE HARAN
    CUANDO SE LES HAGA CLICK (ESA LOGICA FUNCIONA EN ESTE COMPONENTE, NO EN LA TABLA)
  */
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

        this.categorias = categoriasMock.sort((a, b) => a.nombre > b.nombre ? 1 : -1);

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
      data => this.proveedores = data.map(item => item.nombre)
    );
  }

  /*
      PRIMERO SE CREA UN DIALOGO PARA CREAR UN NUEVO REGISTRO. UNA VEZ
    TERMINADO DICHO REGISTRO, SE FIJA QUE HAYA INGRESADO UN REGISTRO COMPLETO
    (LAS VALIDACIONES DEL COMPONENTE DE DIALOGO HARAN SU PARTE), SE ENVIA EL
    DATO POR LA LLAMADA API Y SE ESPERA EL RESULTADO (ACTIVANDO EL LOADING SERVICE
    PARA QUE EL REGISTRO NO PUEDA HACER NADA MIENTRAS SE PROCESA LA SOLICITUD)
      UNA VEZ COMPLETADA LA LLAMADA, SE MOSTRARA UN CARTEL DE CONFIRMACION
    Y SE AGREGARA EL NUEVO REGISTRO A LA TABLA. EN CASO DE HABER UNA FALLA EN
    LA LLAMADA, APARECERA UN MENSAJE DE ERROR
  */
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

  /*
      PRIMERO SE CREA UN DIALOGO PARA MODIFICAR UN REGISTRO EXISTENTE. UNA VEZ
    TERMINADO DICHO TRABAJO, SE FIJA QUE HAYA INGRESADO UN REGISTRO COMPLETO
    (LAS VALIDACIONES DEL COMPONENTE DE DIALOGO HARAN SU PARTE), SE ENVIA EL
    DATO POR LA LLAMADA API Y SE ESPERA EL RESULTADO (ACTIVANDO EL LOADING SERVICE
    PARA QUE EL REGISTRO NO PUEDA HACER NADA MIENTRAS SE PROCESA LA SOLICITUD)
      UNA VEZ COMPLETADA LA LLAMADA, SE MOSTRARA UN CARTEL DE CONFIRMACION
    Y SE INTEGRA EL REGISTRO MODIFICADO A LA TABLA. EN CASO DE HABER UNA FALLA EN
    LA LLAMADA, APARECERA UN MENSAJE DE ERROR
  */
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

  /*
      PRIMERO SE CREA UN DIALOGO PARA PREGUNTAR AL USUARIO SI QUIERE REALIZAR LA ACCION. UNA VEZ
    CONFIRMADO DICHO TRABAJO, SE FIJA QUE HAYA CONFIRMADO PARA REALIZAR EL BORRADO LLAMANDO A
    LA API CORRESPONDIENTE.
      UNA VEZ COMPLETADA LA LLAMADA, SE MOSTRARA UN CARTEL DE CONFIRMACION
    Y SE ELIMINARA EL REGISTRO DE LA TABLA. EN CASO DE HABER UNA FALLA EN
    LA LLAMADA, APARECERA UN MENSAJE DE ERROR
  */
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

  /*
      EL PUNTO DE ESTA FUNCION FUE DAR UNA SENSACION DE PODER MODIFICAR LOS MARGENES DE GANANCIAS
    EN LA PRESENTACION DE LA TESIS (TENIENDO EN CUENTA QUE NO ESTABA MODIFICANDO DATOS DE LA BASE)
      LO QUE HACE ES GENERAR UN DIALOGO DONDE SE PUEDEN MODIFICAR LOS MARGENES DE CADA TIPO DE
    PRODUCTOS, ESTAS MODFICACIONES IMPACTAN EN TODAS LOS PRODUCTOS DEL STOCK USANDO UN MAP
    (MULTIPLICO EL PRECIO DE COMPRA POR EL MARGEN DE GANANCIA SEGUN EL TIPO DE PRODUCTO) PARA
    DESPUES DEVOLVER EL ARRAY MODIFICADO A LA TABLA QUE VERA EL USUARIO MOMENTOS DESPUES
  */
  editarGanancias() {
    const dialogRef = this.dialog.open(
      DialogEditarGananciasComponent, {
        width: '600px',
        disableClose: true,
        data: this.categorias
      }
    );

    dialogRef.afterClosed().subscribe(
      ganancias => {
        if (ganancias) {
          const dialogResult = this.dialog.open(
            DialogOperacionOkComponent,
            { width: '600px', disableClose: true }
          );

          dialogResult.afterClosed().subscribe(
            () => {
              this.loadingService.toggleLoading();
              this.categorias = ganancias;

              const newData = this.dataSource.data.map(
                item => {
                  item.precioVenta = item.precioCompra * (1 + ((this.categorias.find(_item => _item.nombre === item.categoria || _item.nombre === 'OTROS')).ganancia / 100))
                  return item;
                }
              );

              this.dataSource.data = [];
              this.dataSource.data = newData;

              this.loadingService.toggleLoading();
            }
          );
        }
      }
    );
  }

  // actualizarPrecios = (data: Productos[]) => {
  //   data.map(
  //     item => item.precioVenta = item.precioCompra * (1 + ((this.categorias.find(_item => _item.nombre === item.categoria || _item.nombre === 'OTROS')).ganancia / 100))
  //   );

  //   return data;
  // }
}
