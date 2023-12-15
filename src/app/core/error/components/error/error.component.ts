import { ChangeDetectionStrategy, Component, Input as RouteData } from '@angular/core';

@Component({
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ErrorComponent {

  @RouteData()
  public statusCode!: number;

  @RouteData()
  public message!: string;
}
