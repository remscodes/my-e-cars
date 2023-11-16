import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHour',
  standalone: true,
})
export class MinuteToHourPipe implements PipeTransform {

  public transform(value: number): string {
    return `${Math.floor(value / 60)}h${value % 60}min`;
  }
}
