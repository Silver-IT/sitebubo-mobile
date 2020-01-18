import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intparse'
})
export class IntparsePipe implements PipeTransform {

  transform(numberValue): any {
    return parseInt(numberValue, 10);
  }

}
