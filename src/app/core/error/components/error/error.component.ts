import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ErrorComponent {

  public constructor() { }
}
