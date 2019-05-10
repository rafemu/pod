import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectSort'
})
export class ProjectSortPipe implements PipeTransform {
  transform(array: any, field?: any, orderDesc?: any): any {
    array.sort((a: any, b: any) => {
      if (a[field] > b[field]) {
        return orderDesc ? -1 : 1;
      } else if (a[field] < b[field]) {
        return orderDesc ? 1 : -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
