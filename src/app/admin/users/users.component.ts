import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog } from '@angular/material';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
import { AuthService } from '../../core/services/auth.service';
// CONFIGURACIONES
import { URL_USUARIOS } from '../../shared/configs/urls.config';
import { TABLA_USUARIOS } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogUsuarioAddEditComponent } from '../../dialogs/dialog-usuario-add-edit/dialog-usuario-add-edit.component';
import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogCambiarPassComponent } from '../../dialogs/dialog-cambiar-pass/dialog-cambiar-pass.component';
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userLogin: Usuarios;

  tableTitle = TABLA_USUARIOS.title;
  dataSource = new MatTableDataSource<Usuarios>();
  headerTitles = Object.keys(TABLA_USUARIOS.cells);
  tableHeaders = TABLA_USUARIOS.headers;
  columnCells = TABLA_USUARIOS.cells;
  formatTableCells = TABLA_USUARIOS.format;
  isLoading: boolean;
  addButton = {
    label: 'Registrar usuario',
    buttonEvent: () => this.agregarUsuario()
  };
  searchButton = {
    placeHolder: this.headerTitles.map(item => this.tableHeaders[item].toLowerCase()).join(', ')
  };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dataService: DataService,
    private loadingService: LoadingService,
    private authService: AuthService,
  ) {
    this.authService.getUser.subscribe((data: any) => {
      this.userLogin = JSON.parse(data);
    });
  }

  ngOnInit() {
    /*
        CUANDO SE TERMINA LA LLAMADA A LA API, SE FIJA QUE HAYA TRAIDO DATOS
      EN CASO DE NO TRAER DATOS (DEVUELVA UN VALOR COMO NULL O UNDEFINED),
      SE MUESTRA AL USUARIO UNA ADVERTENCIA QUE NO HAY CONEXION A INTERNET
        EN CASO DE FUNCIONAR, SE ASIGNA LOS DATOS TRAIDOS DE LA API Y SE CREAN
      LOS BOTONES ADICIONALES CON SU FUNCION PARA MOSTRARSE Y LA LOGICA QUE HARAN
      CUANDO SE LES HAGA CLICK (ESA LOGICA FUNCIONA EN ESTE COMPONENTE, NO EN LA TABLA)
    */
    this.isLoading = true;
    this.dataService.getAsync(URL_USUARIOS.GET_ALL, []).subscribe(
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
          buttonEvent: (user) => this.editarUsuario(user)
        }, {
          buttonIcon: 'lock_open',
          buttonLabel: 'Cambiar pass',
          buttonEvent: (user) => this.cambiarPass(user)
        }, {
          buttonIcon: 'delete',
          buttonLabel: 'Eliminar',
          buttonEvent: (user) => this.eliminarUsuario(user)
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
  agregarUsuario() {
    const dialogRef = this.dialog.open(
      DialogUsuarioAddEditComponent, {
        width: '900px',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(
      newUser => {
        if (newUser) {
          this.loadingService.toggleLoading();

          this.dataService.createAsync(
            URL_USUARIOS.ADD_USUARIO,
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
      PRIMERO SE CREA UN DIALOGO PARA MODIFICAR UN REGISTRO EXISTENTE. UNA VEZ
    TERMINADO DICHO TRABAJO, SE FIJA QUE HAYA INGRESADO UN REGISTRO COMPLETO
    (LAS VALIDACIONES DEL COMPONENTE DE DIALOGO HARAN SU PARTE), SE ENVIA EL
    DATO POR LA LLAMADA API Y SE ESPERA EL RESULTADO (ACTIVANDO EL LOADING SERVICE
    PARA QUE EL REGISTRO NO PUEDA HACER NADA MIENTRAS SE PROCESA LA SOLICITUD)
      UNA VEZ COMPLETADA LA LLAMADA, SE MOSTRARA UN CARTEL DE CONFIRMACION
    Y SE INTEGRA EL REGISTRO MODIFICADO A LA TABLA. EN CASO DE HABER UNA FALLA EN
    LA LLAMADA, APARECERA UN MENSAJE DE ERROR
  */
  editarUsuario(usuario: Usuarios) {
    const usuarioMod = Object.assign({}, usuario);
    const dialogRef = this.dialog.open(
      DialogUsuarioAddEditComponent, {
        width: '900px',
        disableClose: true,
        data: usuarioMod
      }
    );

    dialogRef.afterClosed().subscribe(
      newUser => {
        if (newUser) {
          this.loadingService.toggleLoading();

          this.dataService.updateAsync(
            URL_USUARIOS.UPDATE_USUARIO,
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

  cambiarPass(usuario: Usuarios) {
    const dialogRef =
      this.dialog.open(
        DialogCambiarPassComponent, {
          width: '900px',
          data: usuario
        }
      );

    dialogRef.afterClosed().subscribe(
      result => console.warn(result)
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
  eliminarUsuario(usuario: Usuarios) {
    if (usuario.id === this.userLogin.id) {
      this.dialog.open(
        DialogAdvertenciaComponent, {
          width: '600px',
          disableClose: true,
          data: {
            title: 'Eliminar usuario',
            confirmText: 'Esta intentando eliminar su propio usuario (con el que ha ingresado al sistema).'
          }
        });
    } else {
      const dialogRef = this.dialog.open(
        DialogConfirmarComponent,
        {
          width: '900px',
          disableClose: true,
          data: {
            title: 'Eliminar usuario',
            confirmText: `¿Está seguro que desea eliminar a ${usuario.nombre} ${usuario.apellido} del listado de usuarios?`
          }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.confirm) {
          this.loadingService.toggleLoading();

          this.dataService.deleteAsync(
            URL_USUARIOS.DELETE_USUARIO,
            usuario.id,
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
    };
  }
}
