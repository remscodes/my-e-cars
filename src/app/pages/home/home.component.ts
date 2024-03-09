import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LockWidgetComponent } from './components/lock-widget/lock-widget.component';
import { ChargeWidgetComponent } from './groups/charge/components/charge-widget/charge-widget.component';
import { HvacWidgetComponent } from './groups/hvac/components/hvac-widget/hvac-widget.component';

@Component({
  standalone: true,
  imports: [
    LockWidgetComponent,
    ChargeWidgetComponent,
    HvacWidgetComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
