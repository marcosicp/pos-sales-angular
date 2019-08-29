import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { MatSort,MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from '../../core/services/data.service';
import { URL_CLIENTES } from '../../shared/configs/urls.config';
import { DialogClienteAddEditComponent } from '../../dialogs/dialog-cliente-add-edit/dialog-cliente-add-edit.component';
import { Clientes } from '../../shared/models/clientes.model';
import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  private zone: NgZone;
  total: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoading: boolean;
  displayedColumns: string[] = [ 'creado', 'activo', 'telefono', 'nombre', 'email', 'eliminar','editar'];
  dataSource: MatTableDataSource<Clientes>;
  selection = new SelectionModel<Clientes>(true, []);
  clientes: Clientes[] = [];

  constructor(private comerciosService: DataService, public dialog: MatDialog) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.comerciosService.getAsync(URL_CLIENTES.GET_ALL, this.clientes).subscribe(
      data => {
        this.clientes = data;
        this.dataSource = new MatTableDataSource<Clientes>();
        this.dataSource.data = this.clientes;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit() {
  }


  agregarCliente() {
    const dialogRef = this.dialog.open(DialogClienteAddEditComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comerciosService.getAsync(URL_CLIENTES.GET_ALL, this.clientes).subscribe(
        data => {
          this.clientes = data;
          
          this.dataSource.data = this.clientes;
          this.isLoading = false;
        }
      );
    });
  }

  eliminarCliente(cliente: Clientes) {
    const dialogRef = this.dialog.open(DialogConfirmarComponent, {
      width: '900px', data: {title: "Eliminar Cliente", confirmText: "Esta seguro que desear eliminar este cliente?"} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.comerciosService.deleteAsync(URL_CLIENTES.DELETE_CLIENTE, cliente.id, this.clientes).subscribe(
          data => {
              this.dataSource = new MatTableDataSource<Clientes>();
              this.dataSource.data = this.clientes;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.isLoading = false; 
          }
        );
      }
    });
  }

}
