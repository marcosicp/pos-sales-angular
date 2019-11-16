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

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getAsync(URL_MOVIMIENTOS.GET_ALL, [])
      .subscribe(
        data => {
          console.warn(data);
          this.dataSource.data = data;
          this.isLoading = false;
        }
      );
  }
}
