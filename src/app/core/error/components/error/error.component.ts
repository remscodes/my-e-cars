import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ErrorComponent {}
