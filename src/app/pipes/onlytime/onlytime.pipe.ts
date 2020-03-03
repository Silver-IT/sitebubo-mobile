import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlytime'
})
export class OnlytimePipe implements PipeTransform {

  transform(customDate: string): any {
    if (!customDate) {
      return;
    }
    const start = customDate.split(' ');
    if (start[1]) {
      const temp = start[1].split(':');
      const result = temp[0] + ':' + temp[1];
      return result;
    }
  }

}
