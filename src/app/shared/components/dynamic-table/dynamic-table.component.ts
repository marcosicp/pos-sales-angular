import { Component, ViewChild, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {
  @Input()
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @Input()
  displayedColumns: string[] = [];
  @Input()
  mainTitle: string;
  @Input()
  isLoading: boolean;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
}
