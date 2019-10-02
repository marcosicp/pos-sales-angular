import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
// ENTIDADES
import { Productos } from '../../shared/models/producto.model';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// CONFIGURACIONES
import { URL_PRODUCTOS } from '../../shared/configs/urls.config';
import { TABLA_PRODUCTOS } from '../../shared/configs/table.config';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  addItemActive = false;
  selectedFiles: FileList;
  // currentUpload: Upload;

  tableTitle = TABLA_PRODUCTOS.title;
  dataSource = new MatTableDataSource<Productos>();
  headerTitles = Object.keys(TABLA_PRODUCTOS.cells);
  tableHeaders = TABLA_PRODUCTOS.headers;
  columnCells = TABLA_PRODUCTOS.cells;
  formatTableCells = TABLA_PRODUCTOS.format;
  isLoading: boolean;

  constructor(
    private dataService: DataService
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.dataService.getAsync(URL_PRODUCTOS.GET_ALL, []).subscribe(
      data => {
        this.dataSource.data = data;
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
    this.addItemActive = !this.addItemActive;
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
}
