import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '@remscodes/renault-api';

export interface EnabledDay {
  day: Day;
  enabled: boolean;
}

@Component({
  selector: 'app-week-ribbon',
  templateUrl: './week-ribbon.component.html',
  styleUrl: './week-ribbon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    UpperCasePipe,
  ],
})
export class WeekRibbonComponent {

  @Input({ required: true })
  public enabledDays!: EnabledDay[];

  @Input('readonly')
  public isReadonly: boolean = false;

  @Output()
  public enabledDaysChange: EventEmitter<EnabledDay[]> = new EventEmitter();

  public toggle(day: EnabledDay): void {
    day.enabled = !day.enabled;
  }
}
