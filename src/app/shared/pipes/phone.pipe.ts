import { Pipe, PipeTransform } from '@angular/core';
import Caracteristicas from '../mocks/caracteristicas.mock';

@Pipe({
  name: 'phonePipe'
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    let result = '-';

    value = !value.match('0800') ?
      value.replace(/[- ]/g, '').replace(/[0]/, '') :
      value.replace(/[- ]/g, '');

    Caracteristicas.forEach(
      item => {
        const match = value.match(item)
        if (match && match.index === 0 && result === '-') {
          result = `${value.substring(0, item.length)}-${value.split(item)[1]}`;
        }
      }
    );

    return result;
  }
}
