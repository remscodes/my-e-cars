import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BetterRouter } from '../../shared/services/better-router.service';
import { Bouncer } from '../../shared/services/bouncer.service';
import { Evaluator } from '../../shared/services/evaluator.service';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {

  private bouncer = inject(Bouncer);
  private router = inject(BetterRouter);
  private evaluator = inject(Evaluator);

  public switchAccount(): void {
    this.bouncer.clearAccount();
  }

  public logout(): void {
    this.evaluator.confirm({
      id: 'ConfirmationDialogComponent-Disconnect',
      data: {
        title: 'Déconnexion',
        message: `Voulez-vous réellement vous déconnecter ?`,
        noLabel: 'Annuler',
        type: 'warn',
      },
    }, {
      accepted: () => {
        this.bouncer.disconnect();
        this.router.navigate(['login']).then();
      },
    });
  }
}
