import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { BetterRouter } from '../../../../../../shared/services/better-router.service';

@Component({
  selector: 'app-charge-actions',
  templateUrl: './charge-actions.component.html',
  styleUrls: ['./charge-actions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
  ],
})
export class ChargeActionsComponent {

  public constructor(
    private router: BetterRouter,
    private route: ActivatedRoute,
  ) { }

  private extras: NavigationExtras = {
    relativeTo: this.route,
  };

  public goToChargeMode(): void {
    this.navigate('charge-mode');
  }

  public goToHistory(): void {
    this.navigate('charge-history');
  }

  private navigate(route: string): void {
    this.router.navigate([route], this.extras).then();
  }
}
