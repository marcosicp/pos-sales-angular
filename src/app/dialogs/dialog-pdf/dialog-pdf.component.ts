import { Component, OnInit, Inject } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-pdf',
  templateUrl: './dialog-pdf.component.html',
  styleUrls: ['./dialog-pdf.component.scss']
})
export class DialogPDFComponent implements OnInit {
  pdfSrc = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    debugger;
    // this.pdfSrc = data;
    if (data.action === 'Tesis') {
      this.pdfSrc = '../assets/Clinker - Administración de Proyectos.pdf';
    } else {
      this.pdfSrc = '../assets/Clinker - Carpera de Tesis (2).pdf';
    }
   }

  ngOnInit() {
  }

}
