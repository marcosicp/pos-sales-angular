import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
// MODELOS
import { Clientes } from '../../shared/models/clientes.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// CONFIGURACIONES
import { URL_CLIENTES } from '../../shared/configs/urls.config';
import { TABLA_CLIENTES } from '../../shared/configs/table.config';
// DIALOGOS
import { DialogClienteAddEditComponent } from '../../dialogs/dialog-cliente-add-edit/dialog-cliente-add-edit.component';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Clientes[] = [];


  tableTitle = TABLA_CLIENTES.title;
  dataSource = new MatTableDataSource<Clientes>();
  headerTitles = Object.keys(TABLA_CLIENTES.cells);
  tableHeaders = TABLA_CLIENTES.headers;
  columnCells = TABLA_CLIENTES.cells;
  formatTableCells = TABLA_CLIENTES.format;
  isLoading: boolean;
  addButton = {
    buttonEvent: () => this.agregarCliente()
  };
  searchButton = {
    placeHolder: 'nombre',
  };

  constructor (
    private comerciosService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.comerciosService.getAsync(URL_CLIENTES.GET_ALL, this.clientes).subscribe(
      data => {
        this.dataSource.data = data;
        this.columnCells.opciones = [{
            buttonIcon: 'edit',
            buttonLabel: 'Modificar',
            buttonEvent: (cliente) => this.editarCliente(cliente)
          },
          {
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
    this.dialog.open(
      DialogClienteAddEditComponent, {
        width: '900px',
        disableClose: true
      }
    );
  }

  editarCliente(cliente: Clientes) {
    this.dialog.open(
      DialogClienteAddEditComponent, {
        width: '900px',
        disableClose: true,
        data: cliente
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
            confirmText: `¿Está seguro que desear eliminar a ${cliente.nombre} del sistema?`
          }
        }
      );

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;

      if (result.confirm) {
        this.comerciosService.deleteAsync(URL_CLIENTES.DELETE_CLIENTE, cliente.id, this.clientes).subscribe(
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
