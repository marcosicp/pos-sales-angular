import { DialogVerItemsCompraComponent } from './../../dialogs/dialog-ver-items-compra/dialog-ver-items-compra.component';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
// MODELOS
// import { Venta } from '../../shared/models/venta.model';
import { Proveedores } from '../../shared/models/proveedores.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
// CONFIGURACIONES
import { URL_PROVEEDORES } from '../../shared/configs/urls.config';
import { TABLA_COMPRAS_PROVEEDORES, TABLA_PROVEEDORES } from '../../shared/configs/table.config';
// DIALOGOS
// import { DialogConfirmarComponent } from '../../dialogs/dialog-confirmar/dialog-confirmar.component';
// import { DialogProveedoresAddEditComponent } from '../../dialogs/dialog-proveedores-add-edit/dialog-proveedores-add-edit.component';
// import { DialogSinConexionComponent } from '../../dialogs/dialog-sin-conexion/dialog-sin-conexion.component';
// import { DialogOperacionOkComponent } from '../../dialogs/dialog-operacion-ok/dialog-operacion-ok.component';

@Component({
  selector: 'app-compras-proveedores',
  templateUrl: './compras-proveedores.component.html',
  styleUrls: ['./compras-proveedores.component.scss']
})
export class ComprasProveedoresComponent implements OnInit {
  /*
    TABLETITLE: TITULO DE LA TABLA
    DATASOURCE: EL CONJUNTO DE DATOS QUE SE MOSTRARA EN LA TABLE
    HEADERTITLES: LOS NOMBRES DE LAS COLUMNAS QUE SE USARAN COMO RELACION PARA CREAR CADA UNA
    TABLEHEADERS: LOS TITULOS DE CADA COLUMNA, HACIENDO REFERENCIA LA DATO QUE SE VA A MOSTRAR
    COLUMNCELLS: EL CONJUNTO DE PROPIEDADES DEL OBJETO (PUEDE SER UNA PROPIEDAD O LA PROPIEDAD DENTRO DE UN OBJETO QUE RESULTA SER OTRA PROPEIDAD)
    FORMATTABLECELLS: EL CONJUNTO DE FORMATOS QUE LLEVARA CADA PROPIEDAD PARA MOSTRARSE DE UNA FORMA AL USUARIO
    ISLOADING: USADO PARA MOSTRAR LA ANIMACION AL USUARIO MIENTRAS SUCEDE LA CARGA DE DATOS
  */
  tableTitle = TABLA_COMPRAS_PROVEEDORES.title;
  dataSource = new MatTableDataSource<Proveedores>();
  headerTitles = Object.keys(TABLA_COMPRAS_PROVEEDORES.cells);
  tableHeaders = TABLA_COMPRAS_PROVEEDORES.headers;
  columnCells = TABLA_COMPRAS_PROVEEDORES.cells;
  formatTableCells = TABLA_COMPRAS_PROVEEDORES.format;
  isLoading: boolean;
  // addButton = {
  //   label: 'Registrar proveedor',
  //   buttonEvent: () => this.agregarProveedor()
  // };
  searchButton = {
    // placeHolder: this.headerTitles.map(item => this.tableHeaders[item].toLowerCase()).join(', ')
  };
  otherButtons = [
    {
      icon: 'shopping_cart',
      label: 'Volver',
      buttonEvent: () => this.volver()
    },
   
  ];

  constructor(
    private router: Router,
    private comerciosService: DataService,
    public dialog: MatDialog,
    private loadingService: LoadingService
  ) { }

  /*
      CUANDO SE TERMINA LA LLAMADA A LA API, SE FIJA QUE HAYA TRAIDO DATOS
    EN CASO DE NO TRAER DATOS (DEVUELVA UN VALOR COMO NULL O UNDEFINED),
    SE MUESTRA AL USUARIO UNA ADVERTENCIA QUE NO HAY CONEXION A INTERNET
      EN CASO DE FUNCIONAR, SE ASIGNA LOS DATOS TRAIDOS DE LA API Y SE CREAN
    LOS BOTONES ADICIONALES CON SU FUNCION PARA MOSTRARSE Y LA LOGICA QUE HARAN
    CUANDO SE LES HAGA CLICK (ESA LOGICA FUNCIONA EN ESTE COMPONENTE, NO EN LA TABLA)
  */
  ngOnInit() {
    this.isLoading = true;
    this.comerciosService.getAsync(URL_PROVEEDORES.GET_ALL_COMPRAS_PROVEEDORES, []).subscribe(
      data => {
        this.dataSource.data = data;
        this.columnCells.opciones = [{
          buttonIcon: 'edit',
          buttonLabel: 'Modificar',
          buttonEvent: (proveedor) => this.verItems(proveedor)
        },
        // {
        //   buttonIcon: 'delete',
        //   buttonLabel: 'Eliminar',
        //   buttonEvent: (proveedor) => this.eliminarProveedor(proveedor)
        // }
      ];
        this.isLoading = false;
      }
    );
  }

  verItems(compra: any) {
    
    this.dialog.open(
      DialogVerItemsCompraComponent,
      {
        width: '80%',
        disableClose: true,
        data: compra
      });
  }

  volver(){
    this.router.navigate(['proveedores'])
  }

}
