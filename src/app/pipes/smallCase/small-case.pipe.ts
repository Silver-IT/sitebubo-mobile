import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallCase'
})
export class SmallCasePipe implements PipeTransform {

  transform(stringValue): any {
    return stringValue.toLowerCase();
  }

}
