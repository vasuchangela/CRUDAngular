import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args.length < 3)
    {
      return value
    }
    else
    {
      return value.filter((item:any)=>{
        return JSON.stringify(item).toLocaleLowerCase().includes(args);
      })
    }
  }

}
