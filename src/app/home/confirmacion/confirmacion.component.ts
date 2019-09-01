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
  // imagenUrl: string = "../../../assets/icons/nointernet.png";
  selectedFiles: FileList;
  ventas= new Venta();
  result;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { 
    this.route.queryParams.subscribe(params => {
        
      this.ventas = JSON.parse(params.pedido);
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
      
    this.dataService.postAsync(URL_PEDIDOS.CONFIRMAR, this.ventas).subscribe(
      data => {
        
        // this.test = data;
          
        this.selectedFiles = null;

      },
      error => {
        console.log(error);
      }
    );

    this.selectedFiles = null;
  }

}
