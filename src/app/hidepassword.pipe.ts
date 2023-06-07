import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hidepassword'
})
export class HidepasswordPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/./g, '*');
  }

}
