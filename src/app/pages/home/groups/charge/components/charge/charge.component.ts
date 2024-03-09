import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChargeDetails } from '@remscodes/renault-api';
import { MinuteToHourPipe } from '../../../../../../shared/pipes/minute-to-hour.pipe';

@Component({
  selector: 'app-charge',
  standalone: true,
  imports: [
    MatIconModule,
    MinuteToHourPipe,
    DatePipe,
  ],
  templateUrl: './charge.component.html',
  styleUrl: './charge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeComponent {

  @Input({ required: true })
  public charge!: ChargeDetails;

  public expanded: boolean = false;

  public toggle(): void {
    this.expanded = !this.expanded;
  }
}
