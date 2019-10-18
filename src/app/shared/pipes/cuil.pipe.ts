import { Pipe, PipeTransform } from '@angular/core';

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
