import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatone'
})
export class FloatonePipe implements PipeTransform {

  transform(numberValue): any {
    return parseFloat(numberValue).toPrecision(2);
  }

}
