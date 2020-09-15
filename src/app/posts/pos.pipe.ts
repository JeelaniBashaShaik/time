import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'post'
})
export class PostPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    /* if (typeof(value.toDate()) !== 'function') {
      const postDate = value;
      const postTime = `${new Date(value).getHours()}:${new Date(value).getMinutes()}`;
    if (postDate === new Date().getDate()) {
      return `Today, ${postTime}`;
    } else if ((postDate - 1) === new Date().getDate()) {
      return 'Yesterday';  // use moment js and find if difference is 1 day
    }
    return `${new Date(value).getDate()}/${new Date(value).getMonth() + 1}/${new Date(value).getFullYear()} ${postTime}`;
    } */
    //value = value.toDate();
    if (value !== undefined) {
      const postDate = value;
      const postTime = `${new Date(value).getHours()}:${new Date(value).getMinutes()}`;
    if (postDate === new Date().getDate()) {
      return `Today, ${postTime}`;
    } else if ((postDate - 1) === new Date().getDate()) {
      return 'Yesterday';  // use moment js and find if difference is 1 day
    }
    return `${new Date(value).getDate()}/${new Date(value).getMonth() + 1}/${new Date(value).getFullYear()} ${postTime}`;
  }
  }

}
