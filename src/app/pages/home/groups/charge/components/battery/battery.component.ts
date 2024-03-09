import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BatteryStatus, PlugStatus } from '@remscodes/renault-api';

@Component({
  selector: 'app-battery',
  standalone: true,
  imports: [],
  templateUrl: './battery.component.html',
  styleUrl: './battery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryComponent implements OnChanges {

  @Input({ required: true })
  public batteryStatus!: BatteryStatus;

  public batteryGradient!: string;

  public ngOnChanges({ batteryStatus: { currentValue: _batteryStatus } }: SimpleChanges): void {
    if (!_batteryStatus) return;

    const color: string = (_batteryStatus?.plugStatus === PlugStatus.PLUGGED) ? '#00f000' : 'lightblue';
    this.batteryGradient = `linear-gradient(to right, ${color} ${_batteryStatus?.batteryLevel ?? 0}%, white ${_batteryStatus?.batteryLevel ?? 0}%)`;
  }
}
