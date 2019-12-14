import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(customDate: string): any {
    if (!customDate) {
      return;
    }
    let arrayTemp = customDate.split('-');
    let temp = new Date(parseInt(arrayTemp[2]), parseInt(arrayTemp[1])-1, parseInt(arrayTemp[0]));
    let again = temp.toUTCString();
    const arra  = again.split(' ');
    again = arra[1] + ' ' + arra[2] + ' ' + arra[3];
    console.log(again);
    return again;
  }

}
