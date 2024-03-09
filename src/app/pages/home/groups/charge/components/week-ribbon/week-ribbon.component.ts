import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '@remscodes/renault-api';

export interface EnabledDay {
  day: Day;
  enabled: boolean;
}

@Component({
  selector: 'app-week-ribbon',
  standalone: true,
  imports: [
    UpperCasePipe,
  ],
  templateUrl: './week-ribbon.component.html',
  styleUrl: './week-ribbon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekRibbonComponent {

  @Input({ required: true })
  public enabledDays!: EnabledDay[];

  @Input('readonly')
  public isReadonly: boolean = false;

  @Output()
  public enabledDaysChange = new EventEmitter<EnabledDay[]>();

  public toggle(day: EnabledDay): void {
    day.enabled = !day.enabled;
  }
}
