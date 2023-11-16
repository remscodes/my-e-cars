import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LockWidgetComponent } from './components/lock-widget/lock-widget.component';
import { ChargeWidgetComponent } from './groups/charge/components/charge-widget/charge-widget.component';
import { HvacWidgetComponent } from './groups/hvac/components/hvac-widget/hvac-widget.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LockWidgetComponent,
    ChargeWidgetComponent,
    HvacWidgetComponent,
  ],
})
export class HomeComponent {}
