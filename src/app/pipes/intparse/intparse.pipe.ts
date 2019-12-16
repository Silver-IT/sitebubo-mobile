import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intparse'
})
export class IntparsePipe implements PipeTransform {

  transform(number): any {
    return parseInt(number);
  }

}
