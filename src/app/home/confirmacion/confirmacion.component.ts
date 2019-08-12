import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venta } from '../../shared/models/venta.model';
import { DataService } from '../../core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  selectedFiles: FileList;
  ventas= new Venta();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.ventas.id = params['id'];
      this.ventas.creado = params['creado'];
      this.ventas.total = params['total'];
      this.ventas.pesoTotal = params['pesoTotal'];
      this.ventas.estado = params['estado'];
      this.ventas.clienteId = params['clienteId'];
      this.ventas.usuario = params['usuario'];
      this.ventas.fechaVenta = params['fechaPedido'];
   
    })
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

}
