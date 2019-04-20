import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Productos } from '../../../app/models/producto.model';

@Component({
  selector: 'app-dialog-agregar-editar-producto',
  templateUrl: './dialog-agregar-editar-producto.component.html',
  styleUrls: ['./dialog-agregar-editar-producto.component.scss']
})
export class DialogAgregarEditarProductoComponent {
  public producto: Productos = new Productos();
 

  constructor(public dialogRef: MatDialogRef<DialogAgregarEditarProductoComponent>, @Inject(MAT_DIALOG_DATA) public data: Productos) {
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
