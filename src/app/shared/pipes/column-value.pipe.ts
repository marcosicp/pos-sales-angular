import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnValue'
})
export class ColumnValuePipe implements PipeTransform {
  transform(element: any, args?: any): string {
    const {columns, cellValue} = args;
    const findValueInObject = columns[cellValue].split('.');
    const value = findValueInObject.length === 1 ?
      element[findValueInObject] :
      element[findValueInObject[0]][findValueInObject[1]];

    return value ? value : '-';
  }
}
