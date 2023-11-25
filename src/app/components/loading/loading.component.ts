import { animate, style, transition, trigger } from "@angular/animations";
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnChanges, Signal, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Loading } from '../../shared/services/loading.service';
import { WINDOW } from '../../shared/tokens/window.token';

@Component({
  selector: 'app-loading',
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
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    SpinnerComponent,
  ],
})
export class LoadingComponent implements OnChanges {

  private window: Window = inject(WINDOW);
  private loading: Loading = inject(Loading);

  public active: Signal<boolean> = this.loading.active.asReadonly();

  public canClose: boolean = false;

  public closeButtonTimeout: number = 2000;

  public ngOnChanges({ enable }: SimpleChanges): void {
    if (enable) {
      this.canClose = false;
      this.window.setTimeout(() => {
        this.canClose = true;
      }, this.closeButtonTimeout);
    }
  }

  public forceClose(): void {
    this.loading.stopForce();
    this.canClose = false;
  }
}
