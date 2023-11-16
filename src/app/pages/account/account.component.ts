import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthInfoService } from '../../core/auth/services/auth-info.service';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { BetterRouter } from '../../shared/services/better-router.service';
import { Bouncer } from '../../shared/services/bouncer.service';
import { Evaluator } from '../../shared/services/evaluator.service';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
  ],
})
export class AccountComponent {

  public constructor(
    private authInfoService: AuthInfoService,
    private vehicleInfoService: VehicleInfoService,
    private bouncer: Bouncer,
    private router: BetterRouter,
    private evaluator: Evaluator,
  ) { }

  /* ------- */

  public switchAccount(): void {
    this.bouncer.clearAccount();
  }

  public logout(): void {
    this.evaluator.confirm({
      id: 'ConfirmationDialogComponent-Disconnect',
      data: {
        title: 'Déconnection',
        message: `Voulez-vous réellement mettre fin à votre session ?`,
      },
    }, {
      accepted: () => {
        this.bouncer.disconnect();
        this.router.navigate(['login']).then();
      },
    });
  }
}
