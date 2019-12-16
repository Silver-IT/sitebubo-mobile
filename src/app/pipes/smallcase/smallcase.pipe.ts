import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallcase'
})
export class SmallcasePipe implements PipeTransform {

  transform(stringValue): any {
    return stringValue.toLowerCase();
  }

}
