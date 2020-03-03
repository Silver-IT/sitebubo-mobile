import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floattwo'
})
export class FloattwoPipe implements PipeTransform {

  transform(numberValue): any {
    const temp = numberValue.split(' ');
    console.log(temp[0], temp[1]);
    let result = parseFloat(temp[0]).toPrecision(2) + '  ' + temp[1];
    if (parseFloat(temp[0]) > 0 ) {
      result = '+' + result;
    }
    return result;
  }

}
