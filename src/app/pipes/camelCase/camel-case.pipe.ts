import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(name): any {
    let data = name.split('-');
    let temp = '';
    data.forEach(element => {
      if (element) {
        let one = element.substr(0,1).toUpperCase() + element.substr(1) + ' ';
        temp += one;
      }
    });
    return temp;
  }

}
