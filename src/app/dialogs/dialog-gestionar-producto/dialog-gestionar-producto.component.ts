import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Productos } from '../../shared/models/producto.model';

@Component({
  selector: 'app-dialog-agregar-editar-producto',
  templateUrl: './dialog-gestionar-producto.component.html',
  styleUrls: ['./dialog-gestionar-producto.component.scss']
})
export class DialogGestionarProductoComponent {
  public producto: Productos = new Productos();


  constructor(public dialogRef: MatDialogRef<DialogGestionarProductoComponent>, @Inject(MAT_DIALOG_DATA) public data: Productos) {
    if (data) {
      this.producto = data;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSaveUpdate() {
    this.dialogRef.close(this.producto);
  }
}
