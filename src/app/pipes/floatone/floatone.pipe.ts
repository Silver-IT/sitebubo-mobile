import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatone'
})
export class FloatonePipe implements PipeTransform {

  transform(number): any {
    return parseFloat(number).toPrecision(2);
  }

}
