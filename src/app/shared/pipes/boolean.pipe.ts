import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe'
})
export class BooleanPipe implements PipeTransform {
  transform(value: any, args?: any): string {
    return Boolean(value) && value !== '-' ? 'SI' : 'NO';
  }
}
