import { Component, OnInit } from '@angular/core';
import { DialogPDFComponent } from '../dialogs/dialog-pdf/dialog-pdf.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss']
})
export class SoporteComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  abrirPDF(nombre: String) {
    const dialogRef = this.dialog.open(DialogPDFComponent, {
      width: '900px', disableClose: false,
      data: { action: nombre }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }
}
