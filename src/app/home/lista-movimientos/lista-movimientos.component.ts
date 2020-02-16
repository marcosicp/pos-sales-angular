import { Component, OnInit } from '@angular/core';
import { TABLA_MOVIMIENTOS } from '../../shared/configs/table.config';
import { MatTableDataSource } from '@angular/material';
import { MovimientosCaja } from '../../shared/models/movimientos-caja.model';
import { DataService } from '../../core/services/data.service';
import { URL_MOVIMIENTOS } from '../../shared/configs/urls.config';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.scss']
})
export class ListaMovimientosComponent implements OnInit {
  /*
    TABLETITLE: TITULO DE LA TABLA
    DATASOURCE: EL CONJUNTO DE DATOS QUE SE MOSTRARA EN LA TABLE
    HEADERTITLES: LOS NOMBRES DE LAS COLUMNAS QUE SE USARAN COMO RELACION PARA CREAR CADA UNA
    TABLEHEADERS: LOS TITULOS DE CADA COLUMNA, HACIENDO REFERENCIA LA DATO QUE SE VA A MOSTRAR
    COLUMNCELLS: EL CONJUNTO DE PROPIEDADES DEL OBJETO (PUEDE SER UNA PROPIEDAD O LA PROPIEDAD DENTRO DE UN OBJETO QUE RESULTA SER OTRA PROPEIDAD)
    FORMATTABLECELLS: EL CONJUNTO DE FORMATOS QUE LLEVARA CADA PROPIEDAD PARA MOSTRARSE DE UNA FORMA AL USUARIO
    ISLOADING: USADO PARA MOSTRAR LA ANIMACION AL USUARIO MIENTRAS SUCEDE LA CARGA DE DATOS
  */
  tableTitle = TABLA_MOVIMIENTOS.title;
  dataSource = new MatTableDataSource<MovimientosCaja>();
  headerTitles = Object.keys(TABLA_MOVIMIENTOS.cells);
  tableHeaders = TABLA_MOVIMIENTOS.headers;
  columnCells = TABLA_MOVIMIENTOS.cells;
  formatTableCells = TABLA_MOVIMIENTOS.format;
  isLoading: boolean;
  searchButton = {
    placeHolder: this.headerTitles.map(item => this.tableHeaders[item].toLowerCase()).join(', ')
  };

  constructor(
    private dataService: DataService
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
    this.dataService.getAsync(URL_MOVIMIENTOS.GET_ALL, [])
      .subscribe(
        data => {
          this.dataSource.data = data;
          this.isLoading = false;
        }
      );
  }
}
