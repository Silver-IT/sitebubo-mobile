import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(name): any {
    if (!name) {
      return;
    }
    const data = name.split('-');
    let temp = '';
    data.forEach(element => {
      if (element) {
        const one = element.substr(0, 1).toUpperCase() + element.substr(1) + ' ';
        temp += one;
      }
    });
    return temp;
  }

}
