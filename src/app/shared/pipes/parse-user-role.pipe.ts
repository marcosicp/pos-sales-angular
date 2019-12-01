import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRolePipe'
})
export class ParseUserRolePipe implements PipeTransform {
  transform(value: any): string {
    switch (value) {
      case null:
        return '-';
      default:
        return value ? 'Administrador' : 'Normal';
    }
  }
}
