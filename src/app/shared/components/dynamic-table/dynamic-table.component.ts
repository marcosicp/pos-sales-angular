import { Component, ViewChild, Input, AfterContentInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import columnValueFunction from '../../functions/columnValue.function';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements AfterContentInit {
  @Input()
  tableTitle: string;
  @Input()
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input()
  headerTitles: string[] = [];
  @Input()
  tableHeaders: string[] = [];
  @Input()
  columnCells: string[] = [];
  @Input()
  formatTableCells: string[] = [];
  @Input()
  isLoading: boolean;
  @Input()
  addButton: any;
  @Input()
  searchButton: any;
  private pageSizeOptions: number[] = [10, 25, 50, 100];
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
