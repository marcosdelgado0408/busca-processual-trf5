import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | number[]): string {
    if (!value) return '';

    let date: Date;
    if (typeof value === 'string') {
      date = new Date(value);
    } else if (Array.isArray(value) && value.length >= 5) {
      const [year, month, day, hour, minute, second = 0] = value;
      date = new Date(year, month - 1, day, hour, minute, second);
    } else {
      return '';
    }

    const dayString = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const monthString = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const hourString = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minuteString = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const secondString = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;

    return `${dayString}/${monthString}/${date.getFullYear()} ${hourString}:${minuteString}:${secondString}`;
  }

}
