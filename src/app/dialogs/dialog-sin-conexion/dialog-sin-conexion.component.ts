import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-sin-conexion',
  templateUrl: './dialog-sin-conexion.component.html',
  styleUrls: ['./dialog-sin-conexion.component.scss']
})
export class DialogSinConexionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false)
  }
}
