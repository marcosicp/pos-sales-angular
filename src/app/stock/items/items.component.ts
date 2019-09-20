import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { URL_PRODUCTOS } from '../../shared/configs/urls.config';
import { TABLA_PRODUCTOS } from '../../shared/configs/table.config';
import { Productos } from '../../shared/models/producto.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  addItemActive = false;
  selectedFiles: FileList;
  // currentUpload: Upload;
  dataSource: MatTableDataSource<Productos>;
  isLoading: boolean;
  displayedColumns: string[];
  showDisplayedColumns = TABLA_PRODUCTOS.headers;
  displayedCells = TABLA_PRODUCTOS.cells;
  mainTitle = 'Productos';

  constructor(
    private dataService: DataService
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.dataService.getAsync(URL_PRODUCTOS.GET_ALL, []).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Productos>();
        this.dataSource.data = data;
        this.displayedColumns = this.filterIdData(data[0]);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  addItemToggle() {
    // this.newItemPrice = null;
    // this.newItemName = null;
    // this.newItemType = null;
    if (this.addItemActive === true) {
      this.addItemActive = false;
    } else {
      this.addItemActive = true;
    }
  }

  addItem() {
    const file = this.selectedFiles.item(0);
    // this.currentUpload = new Upload(file);
    // this.db.pushUpload(this.newItemName, this.newItemPrice, this.newItemType, this.currentUpload);
    // this.newItemName = null;
    // this.newItemPrice = null;
    // this.newItemType = null;
    this.selectedFiles = null;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  updateItem(id, name, price, item_type) {
    // this.newItemName = name;
    // this.newItemPrice = Number(price);
    // this.newItemType = item_type;
    // this.db.updateItem(id, {
    //   name: this.newItemName,
    //   price: this.newItemPrice,
    //   item_type: this.newItemType,
    //   quantity: 1 });
  }

  deleteItem(id, type, img) {
    // this.db.deleteItem(id, type, img);
  }

  filterIdData(wordList: string[]): string[] {
    const data = Object.keys(wordList);

    data.forEach(
      (word, i) => {
        if (word === 'id') {
          data.splice(i, 1);
        }
      }
    );

    return data;
  }

}
