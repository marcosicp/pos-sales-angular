import { Component, OnInit } from '@angular/core';
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
    private dataService: DataService,
    public dialog: MatDialog,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.dataService.getAsync(URL_CLIENTES.GET_ALL, []).subscribe(
      data => {
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
