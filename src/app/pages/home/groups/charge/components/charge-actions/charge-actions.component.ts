import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { BetterRouter } from '../../../../../../shared/services/better-router.service';

@Component({
  selector: 'app-charge-actions',
  templateUrl: './charge-actions.component.html',
  styleUrl: './charge-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
  ],
})
export class ChargeActionsComponent {

  private router = inject(BetterRouter);
  private route = inject(ActivatedRoute);

  public goToChargeMode(): void {
    this.navigate('charge-mode');
  }

  public goToHistory(): void {
    this.navigate('charge-history');
  }

  private navigate(route: string): void {
    this.router.navigate([route], { relativeTo: this.route }).then();
  }
}
