import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Venta } from '../../shared/models/venta.model';
import { DataService } from '../../core/services/data.service';
import { ProductoPedido } from '../../shared/models/producto-venta.model';
import { URL_STOCK, URL_PEDIDOS, URL_CLIENTES } from '../../shared/configs/urls.config';
import { Upload } from '../../shared/models/upload.model';
import { MatDialog } from '@angular/material';
import { DialogAdvertenciaComponent } from '../../dialogs/dialog-advertencia/dialog-advertencia.component';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent {

  currentUpload: Upload;
  // imagenUrl: string = "../../../assets/icons/nointernet.png";
  selectedFiles: FileList;
  ventas = new Venta();
  result: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.ventas = JSON.parse(params.pedido);

      this.dataService.getAsync(URL_CLIENTES.GET_ALL, []).subscribe(
        result => {
          this.ventas.cliente = result.find(item => item.id === this.ventas.clienteId);
        }
      );
    });
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.ventas.imagenUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectedFiles.item(0));
  }

  confirmar() {
    this.dataService.postAsync(URL_PEDIDOS.CONFIRMAR, this.ventas).subscribe(
      data => {
        if (data[0] !== "False") {
          this.selectedFiles = null;
          const navigationExtras: NavigationExtras = {
            queryParams: { idventa: JSON.stringify(data[0])}
          };
          this.router.navigate(['agenda'], navigationExtras);
        } else {
          this.dialog.open(
            DialogAdvertenciaComponent,
            {
              width: '600px',
              disableClose: true,
              data: {
                title: 'Problemas de stock',
                confirmText: 'Uno de los productos agregados en el pedido tiene un stock menor de 50 unidades.'
              }
            }
          );
        }
      },
      error => {
        console.log(error);
      }
    );

    this.selectedFiles = null;
  }
}
