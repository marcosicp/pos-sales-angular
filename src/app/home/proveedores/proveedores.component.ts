import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
// MODELOS
// import { Venta } from '../../shared/models/venta.model';
import { Proveedores } from '../../shared/models/proveedores.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// CONFIGURACIONES
import { URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { TABLA_PROVEEDORES } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogProveedoresAddEditComponent } from '../../dialogs/dialog-proveedores-add-edit/dialog-proveedores-add-edit.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  /*
    TABLETITLE: TITULO DE LA TABLA
    DATASOURCE: EL CONJUNTO DE DATOS QUE SE MOSTRARA EN LA TABLE
    HEADERTITLES: LOS NOMBRES DE LAS COLUMNAS QUE SE USARAN COMO RELACION PARA CREAR CADA UNA
    TABLEHEADERS: LOS TITULOS DE CADA COLUMNA, HACIENDO REFERENCIA LA DATO QUE SE VA A MOSTRAR
    COLUMNCELLS: EL CONJUNTO DE PROPIEDADES DEL OBJETO (PUEDE SER UNA PROPIEDAD O LA PROPIEDAD DENTRO DE UN OBJETO QUE RESULTA SER OTRA PROPEIDAD)
    FORMATTABLECELLS: EL CONJUNTO DE FORMATOS QUE LLEVARA CADA PROPIEDAD PARA MOSTRARSE DE UNA FORMA AL USUARIO
    ISLOADING: USADO PARA MOSTRAR LA ANIMACION AL USUARIO MIENTRAS SUCEDE LA CARGA DE DATOS
  */
  tableTitle = TABLA_PROVEEDORES.title;
  dataSource = new MatTableDataSource<Proveedores>();
  headerTitles = Object.keys(TABLA_PROVEEDORES.cells);
  tableHeaders = TABLA_PROVEEDORES.headers;
  columnCells = TABLA_PROVEEDORES.cells;
  formatTableCells = TABLA_PROVEEDORES.format;
  isLoading: boolean;
  addButton = {
    label: 'Registrar proveedor',
    buttonEvent: () => this.agregarProveedor()
  };
  searchButton = {
    placeHolder: this.headerTitles.map(item => this.tableHeaders[item].toLowerCase()).join(', ')
  };
  otherButtons = [
    {
      icon: 'shopping_cart',
      label: 'Registrar compra',
      buttonEvent: () => this.registrarCompra()
    },
    // {
    //   icon: 'label',
    //   label: 'Modificar ganancia',
    //   buttonEvent: () => this.editarGanancias()
    // }
  ];

  constructor(
    private router: Router,
    private comerciosService: DataService,
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
    this.comerciosService.getAsync(URL_PROVEEDORES.GET_ALL, []).subscribe(
      data => {
        if (!data) {
          const dialogRef = this.dialog.open(
            DialogSinConexionComponent,
            { width: '900px',  disableClose: true}
          );

          dialogRef.afterClosed().subscribe(() => this.router.navigate(['welcome']));
        }

        this.dataSource.data = data;
        this.columnCells.opciones = [{
          buttonIcon: 'edit',
          buttonLabel: 'Modificar',
          buttonEvent: (proveedor) => this.editarProveedor(proveedor)
        },
        {
          buttonIcon: 'delete',
          buttonLabel: 'Eliminar',
          buttonEvent: (proveedor) => this.eliminarProveedor(proveedor)
        }];
        this.isLoading = false;
      }
    );
  }

  registrarCompra() {
    this.router.navigate(['registrar-compra']);
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
  agregarProveedor() {
    const dialogRef = this.dialog.open(
      DialogProveedoresAddEditComponent,
      { width: '900px', disableClose: true }
    );

    dialogRef.afterClosed().subscribe(
      newProveedor => {
        if (newProveedor) {
          this.loadingService.toggleLoading();

          this.comerciosService.createAsync(
            URL_PROVEEDORES.ADD_PROVEEDOR,
            newProveedor,
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
  editarProveedor(proveedor: Proveedores) {
    // MANDO UNA COPIA DEL OBJETO PARA NO TENER QUE HACER UN REFRESH DE LA GRILLA
    const proveedorMod: Proveedores = Object.assign({}, proveedor);

    const dialogRef =
      this.dialog.open(
        DialogProveedoresAddEditComponent,
        {
          width: '900px',
          disableClose: true,
          data: proveedorMod
        }
      );

      dialogRef.afterClosed().subscribe(
        newProveedor => {
          if (newProveedor) {
            this.loadingService.toggleLoading();

            this.comerciosService.updateAsync(
              URL_PROVEEDORES.UPDATE_PROVEEDOR,
              newProveedor,
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
  eliminarProveedor(proveedor: Proveedores) {
    const dialogRef = this.dialog.open(
      DialogConfirmarComponent, {
        width: '900px' ,
        disableClose: true,
        data: {
          title: 'Eliminar Proveedor',
          confirmText: `¿Esta seguro que desear eliminar a ${proveedor.razonSocial} de la lista de proveedores?`
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.loadingService.toggleLoading();

        this.comerciosService.deleteAsync(
          URL_PROVEEDORES.DELETE_PROVEEDOR,
          proveedor.id,
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
}
