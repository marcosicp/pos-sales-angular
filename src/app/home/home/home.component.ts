import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { URL_CLIENTES } from '../../shared/configs/urls.config';
import { Clientes } from '../../shared/models/clientes.model';
import { PosService } from '../../core/services/pos.service';
import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientes: Clientes[];
  clientesResponse: Clientes[] = [];

  constructor(private comerciosService: DataService, private ticketSync: PosService, public dialog: MatDialog) { }

  ngOnInit() {
    this.comerciosService.getAsync(URL_CLIENTES.GET_ALL, this.clientesResponse).subscribe(
      data => {
        this.clientes = data;

      },
      error => {
        const dialogRef = this.dialog.open(DialogSinConexionComponent, { width: '600px' });
          dialogRef.afterClosed().subscribe(result => {
        });
        console.log(error);
      }
    );
  }

  updateClienteId(cliente: any) {
    this.ticketSync.updateClienteId(cliente.value);
  }

}
