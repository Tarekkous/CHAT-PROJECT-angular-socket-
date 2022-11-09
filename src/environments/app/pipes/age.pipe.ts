import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any):any{
      console.log(value);
      
      if (value) {
      let CurrentYear:any = new Date().getFullYear();
      let BirthYear:any = new Date(value).getFullYear();
      let userAge = CurrentYear-BirthYear;
      return userAge;
    } 
    else {
      return ""
    }
    }  

    // OU avec le type number :
    //   transform(value: any):number{
    //   console.log(value);
      
    //   if (value) {
    //   let CurrentYear:any = new Date().getFullYear();
    //   let BirthYear:any = new Date(value).getFullYear();
    //   let userAge = CurrentYear-BirthYear;
    //   return userAge;
    // } 
    // else {
    //   return 0 ;
    // }
    // }  

}
