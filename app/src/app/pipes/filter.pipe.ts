import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(array: any, property?: any, term?: any): any {
    if (!term) return array;
    term = term.toLowerCase();
    return array.filter(item => item[property].toLowerCase().indexOf(term) !== -1);
  }
}
