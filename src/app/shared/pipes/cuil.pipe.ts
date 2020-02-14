import { Pipe, PipeTransform } from '@angular/core';
// ESTE PIPE SE USA PARA TRANSFORMAR UN NUMERO DE 11 DIGITOS (MINIMO) A UN NUMERO DE CUIL/CUIT CON EL FORMATO XX-XXXXXXXX-X

@Pipe({
  name: 'cuilPipe'
})
export class CuilPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '-') {
      return '-';
    } else {
      value = value.replace(/-/g, '');
      return `${value.substring(0, 2)}-${value.slice(2, value.length - 1)}-${value.slice(value.length - 1)}`;
    }
  }
}
