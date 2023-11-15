import { Loading } from '@/shared/services/loading.service';
import { WINDOW } from '@/shared/tokens/window.token';
import { animate, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy, Component, Inject, OnChanges, Signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('loadingAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoadingComponent implements OnChanges {

  public active: Signal<boolean> = this.loading.active.asReadonly();

  public canClose: boolean = false;

  public closeButtonTimeout: number = 2000;

  public constructor(
    @Inject(WINDOW) private window: Window,
    private loading: Loading
  ) { }

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
