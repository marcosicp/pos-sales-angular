import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe'
})
export class PhonePipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return value.replace(/[- ]/g, '');
  }
}
