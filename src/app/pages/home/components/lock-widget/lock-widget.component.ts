import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lock-widget',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './lock-widget.component.html',
  styleUrl: './lock-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LockWidgetComponent {}
