import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// MODELOS
import { Productos } from '../../shared/models/producto.model';
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
  categorias: any[];
  errorString = (prop: string) => {
    const errorText = `Por favor complete el campo ${prop.toLocaleUpperCase()}`;
    switch (prop) {
      case 'código':
      case 'stock inicial':
        return `${errorText} sólo con números y letras (sin puntos ni otros caracteres)`;
      case 'nombre':
        return `${errorText} sólo con letras (se pueden usar espacios)`;
      case 'precio de venta':
      case 'precio de compra':
      // case 'peso por unidad':
      //   return `${errorText} sólo con números y hasta 2 decimales`;
      default:
        return `${errorText}, es obligatorio`;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.producto = data.producto || new Productos();
    this.proveedores = data.proveedores;
    this.categorias = data.categorias;
    this.dialogTitle = `${data.producto ? 'Modificar' : 'Registrar'} producto`;
    
  }

  ngOnInit() {
    
    this.productForm = new FormGroup(
      {
        codigo: new FormControl(this.producto.codigo, [Validators.required, Validators.pattern(RegExpHelper.alphaNumeric)]),
        categoria: new FormControl(this.producto.categoria || 0, [Validators.required]),
        nombre: new FormControl(this.producto.nombre, [Validators.required, Validators.pattern(RegExpHelper.lettersSpace)]),
        precioCompra: new FormControl(this.producto.precioCompra  != undefined ? this.producto.precioCompra.toFixed(2) : 0, [Validators.required, Validators.pattern(RegExpHelper.numberDecimals)]),
        precioVenta: new FormControl(this.producto.precioVenta != undefined ? this.producto.precioVenta.toFixed(2) : 0, [Validators.required, Validators.pattern(RegExpHelper.numberDecimals)]),
        fechaVencimiento: new FormControl(this.producto.fechaVencimiento),
        cantidad: new FormControl(this.producto.cantidad),
        // peso: new FormControl(this.producto.peso, [Validators.required, Validators.pattern(RegExpHelper.numberDecimals)]),
        proveedorNombre: new FormControl(this.producto.proveedorNombre, [Validators.required]),
      }

    );

    // this.productForm.patchValue({proveedorNombre: this.producto.proveedorNombre});
    // this.productForm.get('')
  }

  // calcularGanancia(producto: Productos) {
  //   const {precioCompra, categoria} = this.productForm.value;
  //   const ganancia = (categoria && this.categorias.find(item => item.nombre === categoria).ganancia) || 0;
  //   return ((precioCompra || producto.precioCompra || 0) * (1 + (ganancia / 100) || 1)).toFixed(2);
  // }

  guardar() {
    Object.keys(this.productForm.value).forEach(
      prop => this.producto[prop] = this.productForm.value[prop]
    );
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
