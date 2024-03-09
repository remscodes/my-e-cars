import { ChangeDetectionStrategy, Component, Input as RouteData } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {

  @RouteData()
  public statusCode!: number;

  @RouteData()
  public message!: string;
}
