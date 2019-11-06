import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
// SERVICIOS
import { DataService } from '../../core/services/data.service';
// MODELOS
import { Productos } from '../../shared/models/producto.model';
// DIALOGOS
import { DialogOperacionOkComponent } from '../dialog-operacion-ok/dialog-operacion-ok.component';
import { DialogSinConexionComponent } from '../dialog-sin-conexion/dialog-sin-conexion.component';
// URLS DE CONFIGURACION
import { URL_STOCK } from '../../shared/configs/urls.config';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
// REGEXP HELPER
import RegExpHelper from '../../shared/helpers/regex.helper';

@Component({
  selector: 'app-dialog-stock-add-edit',
  templateUrl: './dialog-stock-add-edit.component.html',
  styleUrls: ['./dialog-stock-add-edit.component.scss'],
  providers: [FormGroupDirective]
})
export class DialogStockAddEditComponent implements OnInit {
  dialogTitle: string;
  producto: Productos;
  result: Productos[] = [];
  productForm: FormGroup;
  proveedores: string[];
  errorString = (prop: string) => {
    const errorText = `Por favor complete el campo ${prop.toLocaleUpperCase()}`;
    switch (prop) {
      case 'código':
      case 'stock inicial':
        return `${errorText} sólo con números (sin puntos, letras ni otros caracteres)`;
      case 'nombre':
        return `${errorText} sólo con letras`;
      case 'precio de venta':
      case 'precio de compra':
      case 'peso por unidad':
        return `${errorText} sólo con números y hasta 2 decimales`;
      default:
        return `${errorText}, es obligatorio`;
    }
  }

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogOperacionOkComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.producto = data.producto || new Productos();
    this.proveedores = data.proveedores;
    this.dialogTitle = `${data.producto ? 'Modificar' : 'Registrar'} producto`;
  }

  ngOnInit() {
    this.productForm = new FormGroup(
      {
        codigo: new FormControl(this.producto.codigo, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        nombre: new FormControl(this.producto.nombre, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        precioCompra: new FormControl(this.producto.precioCompra, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        precioVenta: new FormControl(this.producto.precioVenta, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        cantidad: new FormControl(this.producto.cantidad, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        peso: new FormControl(this.producto.peso, [Validators.required, Validators.pattern(RegExpHelper.numbers)]),
        proveedor: new FormControl(this.producto.proveedor, [Validators.required]),
        categoria: new FormControl(this.producto.categoria, [Validators.required]),
      }
    );
  }

  guardar() {
    const URL = this.data ?
      URL_STOCK.UPDATE_STOCK :
      URL_STOCK.ADD_STOCK;

    const ASYNC = this.data ?
      'updateAsync' :
      'createAsync';

    this.dataService[ASYNC](
      URL,
      this.producto,
      this.result
    ).subscribe(
      result => {
        const DialogResult = result ?
          DialogOperacionOkComponent :
          DialogSinConexionComponent;
        const response = result ?
          result[0] : false;

        const _dialogRef = this.dialog.open(
          DialogResult,
          { width: '600px' }
        );

        _dialogRef.afterOpened().subscribe(
          () => {
            this.dialogRef.close(response);
          }
        );
      }
    );
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
