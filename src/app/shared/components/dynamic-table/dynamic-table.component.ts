// EL COMPONENTE TIENE COMO FINALIDAD INTEGRAR TODAS LAS CAPACIDADES DE UNA TABLA DE ANGULAR MATERIAL SOLO INTEGRANDO ALGUNAS PROPIEDADES.
// LA IDEA ES QUE AUN SIN INTEGRAR TODOS LOS INPUTS LISTADOS, SE PUEDA USAR COMO BASE PARA PROBAR UN SET DE DATOS CON SOLO UN ARCHIVO DE CONFIGURACION (LEER EL ARCHIVO "TABLE.CONFIG.TS")
import { Component, ViewChild, Input, AfterContentInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import columnValueFunction from '../../functions/columnValue.function';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements AfterContentInit {
  @Input() // NOMBRE DE LA TABLA
  tableTitle: string;
  @Input() // EL SET DE DATOS QUE SE VA A USAR (PUEDEN VENIR DIRECTAMENTE DESDE LA LLAMADA DE LA API)
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input() // VIENE DESDE LA PROPIEDAD TABLA_CONFIG.HEADERS
  headerTitles: string[] = [];
  @Input() // VIENE DESDE LA PROPIEDAD TABLA_CONFIG.HEADERS
  tableHeaders: string[] = [];
  @Input() // VIENE DESDE LA PROPIEDAD TABLA_CONFIG.CELLS
  columnCells: string[] = [];
  @Input() // VIENE DESDE LA PROPIEDAD TABLA_CONFIG.FORMAT
  formatTableCells: string[] = [];
  @Input() // VIENE DESDE UNA PROPIEDAD INTEGRADA EN EL LOADINGSERVICE (FIJARSE EN CADA MODULO QUE INTEGRA EL COMPONENTE DYNAMICTABLE)
  isLoading: boolean;
  @Input() // VIENE DE UN OBJETO QUE TRAE EL NOMBRE DEL BOTON, EL ICONO ASOCIADO Y UNA FUNCION QUE SE LLAMARA DESDE EL MODULO
  addButton: any;
  @Input()
  otherButtons: any;
  @Input() // VIENE DE UN OBJETO QUE TRAE EL PLACEHOLDER DE LA BARRA DE BUSQUEDA, LA FUNCION DE BUSQUEDA SERA LA LLAMADA "SEARCHDATA" EN ESTE MISMO COMPONENTE
  searchButton: any;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  private _matPaginator: MatPaginator;
  private _matSort: MatSort;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this._matPaginator = mp;
    this.bindTableElements();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this._matSort = ms;
    this.bindTableElements();
  }

  searchData(word: string) {
    this.dataSource.filter = word.trim().toLocaleLowerCase();
  }

  initTooltip(element: any, columnCells: any, column: any) {
    return columnValueFunction(element, columnCells, column);
  }

  ngAfterContentInit() {
    this.bindTableElements();
  }

  bindTableElements() {
    this.dataSource.paginator = this._matPaginator;
    this.dataSource.sort = this._matSort;
  }
}
