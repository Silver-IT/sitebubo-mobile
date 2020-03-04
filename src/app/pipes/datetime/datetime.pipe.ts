import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(customDate: string): any {
    if (!customDate) {
      return;
    }
    const start = customDate.split(' ');
    const arrayTemp = start[0].split('-');
    const temp = new Date(parseInt(arrayTemp[2], 10), parseInt(arrayTemp[1], 10) - 1 , parseInt(arrayTemp[0], 10));
    let again = temp.toUTCString();
    const arra  = again.split(' ');
    again = (parseInt(arra[1], 10) ) + ' ' + arra[2] + ' ' + arra[3];
    if (start[1]) {
      again = again + ' at ' + start[1];
    }
    return again;
  }

}
