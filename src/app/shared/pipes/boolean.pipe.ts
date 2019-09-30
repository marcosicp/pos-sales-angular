import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanPipe'
})
export class BooleanPipe implements PipeTransform {
  transform(value: boolean, args?: any): string {
    return value ? 'SI' : 'NO';
  }
}
