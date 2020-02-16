import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
// MODELOS
import { Clientes } from '../../shared/models/clientes.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// CONFIGURACIONES
import { URL_CLIENTES } from '../../shared/configs/urls.config';
import { TABLA_CLIENTES } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogClienteAddEditComponent } from '../../dialogs/dialog-cliente-add-edit/dialog-cliente-add-edit.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  /*
    TABLETITLE: TITULO DE LA TABLA
    DATASOURCE: EL CONJUNTO DE DATOS QUE SE MOSTRARA EN LA TABLE
    HEADERTITLES: LOS NOMBRES DE LAS COLUMNAS QUE SE USARAN COMO RELACION PARA CREAR CADA UNA
    TABLEHEADERS: LOS TITULOS DE CADA COLUMNA, HACIENDO REFERENCIA LA DATO QUE SE VA A MOSTRAR
    COLUMNCELLS: EL CONJUNTO DE PROPIEDADES DEL OBJETO (PUEDE SER UNA PROPIEDAD O LA PROPIEDAD DENTRO DE UN OBJETO QUE RESULTA SER OTRA PROPEIDAD)
    FORMATTABLECELLS: EL CONJUNTO DE FORMATOS QUE LLEVARA CADA PROPIEDAD PARA MOSTRARSE DE UNA FORMA AL USUARIO
    ISLOADING: USADO PARA MOSTRAR LA ANIMACION AL USUARIO MIENTRAS SUCEDE LA CARGA DE DATOS
  */
  tableTitle = TABLA_CLIENTES.title;
  dataSource = new MatTableDataSource<Clientes>();
  headerTitles = Object.keys(TABLA_CLIENTES.cells);
  tableHeaders = TABLA_CLIENTES.headers;
  columnCells = TABLA_CLIENTES.cells;
  formatTableCells = TABLA_CLIENTES.format;
  isLoading: boolean;
  addButton = {
    label: 'Registrar cliente',
    buttonEvent: () => this.agregarCliente()
  };
  searchButton = {
    placeHolder: this.headerTitles.map(item => this.tableHeaders[item].toLowerCase()).join(', ')
  };

  constructor (
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

    this.dataService.getAsync(URL_CLIENTES.GET_ALL, []).subscribe(
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
            buttonEvent: (cliente) => this.editarCliente(cliente)
          }, {
            buttonIcon: 'delete',
            buttonLabel: 'Eliminar',
            buttonEvent: (cliente) => this.eliminarCliente(cliente)
          }];
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
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
  agregarCliente() {
    const dialogRef = this.dialog.open(
      DialogClienteAddEditComponent, {
        width: '900px',
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(
      newCliente => {
        if (newCliente) {
          this.loadingService.toggleLoading();

          this.dataService.createAsync(
            URL_CLIENTES.ADD_CLIENTE,
            newCliente,
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
  editarCliente(cliente: Clientes) {
    const clienteMod = Object.assign({}, cliente);
    const dialogRef = this.dialog.open(
      DialogClienteAddEditComponent, {
        width: '900px',
        disableClose: true,
        data: clienteMod
      }
    );

    dialogRef.afterClosed().subscribe(
      newUser => {
        if (newUser) {
          this.loadingService.toggleLoading();
          this.dataService.updateAsync(
            URL_CLIENTES.UPDATE_CLIENTE,
            newUser,
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
  eliminarCliente(cliente: Clientes) {
    const dialogRef =
      this.dialog.open(
        DialogConfirmarComponent, {
          width: '900px',
          disableClose: true,
          data: {
            title: 'Eliminar Cliente',
            confirmText: `¿Está seguro que desear eliminar a ${cliente.nombre} de la lista de clientes?`
          }
        }
      );

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;

      if (result.confirm) {
        this.loadingService.toggleLoading();

        this.dataService.deleteAsync(
          URL_CLIENTES.DELETE_CLIENTE,
          cliente.id,
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
