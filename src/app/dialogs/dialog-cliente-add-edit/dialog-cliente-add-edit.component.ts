import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AuthService } from '../../core/services/auth.service';
import { DialogCerrarCajaComponent } from '../dialog-cerrar-caja/dialog-cerrar-caja.component';
import { DataService } from '../../core/services/data.service';
import { Clientes } from '../../shared/models/clientes.model';

@Component({
  selector: 'app-dialog-cliente-add-edit',
  templateUrl: './dialog-cliente-add-edit.component.html',
  styleUrls: ['./dialog-cliente-add-edit.component.scss']
})
export class DialogClienteAddEditComponent implements OnInit {

  cliente: Clientes = new Clientes();

  constructor(private auth: AuthService, private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCerrarCajaComponent>, private comerciosService: DataService) { }

  ngOnInit() {
  }

}
