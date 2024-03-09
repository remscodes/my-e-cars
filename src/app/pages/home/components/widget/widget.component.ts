import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetComponent {}
