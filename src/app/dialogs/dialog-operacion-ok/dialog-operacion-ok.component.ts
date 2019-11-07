import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-operacion-ok',
  templateUrl: './dialog-operacion-ok.component.html',
  styleUrls: ['./dialog-operacion-ok.component.scss']
})
export class DialogOperacionOkComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close(false)
  }
}
