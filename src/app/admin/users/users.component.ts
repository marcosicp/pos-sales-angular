import { Component, OnInit } from '@angular/core';
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
    this.isLoading = true;
    this.dataService.getAsync(URL_USUARIOS.GET_ALL, []).subscribe(
      data => {
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

  eliminarUsuario(usuario: Usuarios) {
    const dialogRef = this.dialog.open(
      DialogConfirmarComponent,
      {
        width: '900px',
        data: {
          title: 'Eliminar usuario',
          confirmText: `¿Está seguro que desea eliminar a ${usuario.nombre} ${usuario.apellido} del listado de usuarios?`
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm && usuario.id !== this.userLogin.id) {
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
      } else {
        this.dialog.open(
          DialogAdvertenciaComponent, {
            width: '600px',
            disableClose: true,
            data: {
              title: 'Eliminar usuario',
              confirmText: 'Esta intentando eliminar su propio usuario (con el que ha ingresado al sistema).'
            }
          });
      }
    });
  }
}
