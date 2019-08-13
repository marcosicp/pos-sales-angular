import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Venta } from '../../shared/models/venta.model';
import { DataService } from '../../core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { URL_PRODUCTOS, URL_PEDIDOS } from '../../shared/configs/urls.config';
import { Upload } from '../../shared/models/upload.model';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  
  currentUpload: Upload;
  // imageUrl: string = "/assets/icon/nointernet.png";
  selectedFiles: FileList;
  ventas= new Venta();

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { 
    debugger;
    this.route.queryParams.subscribe(params => {
      debugger;
      this.ventas = JSON.parse(params.pedido);
      this.ventas.id = params['id'];
      this.ventas.creado = params['creado'];
      this.ventas.total = params['total'];
      this.ventas.pesoTotal = params['pesoTotal'];
      this.ventas.estado = params['estado'];
      this.ventas.clienteId = params['clienteId'];
      this.ventas.usuario = params['usuario'];
      this.ventas.fechaVenta = params['fechaPedido'];
      this.ventas.imagenUrl = params['imagenUrl'];
      debugger;
      this.ventas.productosVenta = params['productosPedidos'];

   
    })

  }

  ngOnInit() {
    
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ventas.imagenUrl = event.target.result;
    }

    reader.readAsDataURL(this.selectedFiles.item(0));
  }

  confirmar() {
    // const file = this.selectedFiles.item(0);
    // this.currentUpload = new Upload(file);

    
    // this.ventas.imagenUrl = this.ve;

    this.dataService.postAsync(URL_PEDIDOS.CONFIRMAR, this.ventas).subscribe(
      data => {
        
        // this.test = data;
        debugger;
        this.selectedFiles = null;

      },
      error => {
        console.log(error);
      }
    );

    this.selectedFiles = null;
  }

}
