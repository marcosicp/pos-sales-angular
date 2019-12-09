import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
// SERVICIOS
import { DataService } from '../../../app/core/services/data.service';

@Component({
  selector: 'app-dialog-editar-ganancias',
  templateUrl: './dialog-editar-ganancias.component.html',
  styleUrls: ['./dialog-editar-ganancias.component.scss']
})
export class DialogEditarGananciasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'ganancia'];
  lista: MatTableDataSource<any>;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.lista = new MatTableDataSource(data.sort((a, b) => a.nombre > b.nombre ? 1 : -1));
  }

  ngOnInit() {
  }

  invalidList = () => this.lista.data.find(item => (!item.ganancia && item.ganancia !== 0) || item.ganancia < 0 || item.ganancia === '');

  guardar() {
    this.dialogRef.close(this.data);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
