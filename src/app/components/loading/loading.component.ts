import { animate, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy, Component, inject, Signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Loading } from '../../shared/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatIconModule,
    SpinnerComponent,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('loadingAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoadingComponent {

  private loading = inject(Loading);

  public active: Signal<boolean> = this.loading.active.asReadonly();

  public forceClose(): void {
    this.loading.stopForce();
  }
}
