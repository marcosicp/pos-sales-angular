import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ClientesUrl } from '../../shared/configs/urls.config';
import { Clientes } from '../../shared/models/clientes.model';
import { PosService } from '../../core/services/pos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientes: Clientes[];
  clientesResponse: Clientes[] = [];

  constructor(private comerciosService: DataService, private ticketSync: PosService,) { }

  ngOnInit() {
    this.comerciosService.getAsync(ClientesUrl.getAll, this.clientesResponse).subscribe(
      data => {
        debugger;
        this.clientes = data;
  
      }
    );
  }

  updateClienteId(cliente: any) {
    debugger;
    this.ticketSync.updateClienteId(cliente.value);
  }

}
