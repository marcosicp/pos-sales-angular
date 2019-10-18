import { Pipe, PipeTransform } from '@angular/core';
import columnValueFunction from '../functions/columnValue.function';

@Pipe({
  name: 'columnValue'
})
export class ColumnValuePipe implements PipeTransform {
  transform(element: any, columns: any, cellValue: any): string {
    const findValueInObject = columns[cellValue].split('.');
    const value = findValueInObject.length === 1 ?
      element[findValueInObject] :
      element[findValueInObject[0]][findValueInObject[1]];

    return value ? value : '-';
  }
}
