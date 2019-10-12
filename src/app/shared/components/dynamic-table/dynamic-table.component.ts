import { Component, ViewChild, Input, AfterContentInit } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

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
  pageSizeOptions: number[] = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterContentInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchData(word: string) {
    this.dataSource.filter = word.trim().toLocaleLowerCase();
  }
}
