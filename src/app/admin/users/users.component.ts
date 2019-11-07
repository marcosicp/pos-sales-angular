import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
// SERVICIOS
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Usuarios } from '../../shared/models/usuarios.model';
// DIALOGOS
import { DialogUsuarioAddEditComponent } from '../../dialogs/dialog-usuario-add-edit/dialog-usuario-add-edit.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
import { DialogCambiarPassComponent } from '../../dialogs/dialog-cambiar-pass/dialog-cambiar-pass.component';
// CONFIGURACIONES
import { URL_USER } from '../../shared/configs/urls.config';
import { TABLA_USUARIOS } from '../../shared/configs/table.config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getAsync(URL_USER.HOME, []).subscribe(
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
    this.dialog.open(
      DialogUsuarioAddEditComponent, {
        width: '900px'
      }
    );
  }

  editarUsuario(usuario: Usuarios) {
    const dialogRef =
      this.dialog.open(
        DialogUsuarioAddEditComponent, {
          width: '900px',
          data: usuario
        }
      );

    dialogRef.afterClosed().subscribe(
      result => console.warn(result)
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
          title: 'Dar de baja usuario',
          confirmText: `¿Está seguro que desea dar de baja a ${usuario.nombre} ${usuario.apellido} del listado de usuarios?`
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.dataService.deleteAsync(URL_USER.DELETE_USER, usuario._id, this.dataSource.data).subscribe(
          data => {
              this.dataSource.data = data;
              this.isLoading = false;
          }
        );
      } else {
        this.isLoading = false;
      }
    });
  }
}
