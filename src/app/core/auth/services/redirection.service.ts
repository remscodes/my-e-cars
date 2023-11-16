import { effect, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { VehicleInfoService } from '../../renault/services/vehicle-info.service';
import { AuthInfoService } from './auth-info.service';

@Injectable({ providedIn: 'root' })
export class RedirectionService {

  public constructor(
    private authInfoService: AuthInfoService,
    private vehicleInfoService: VehicleInfoService,
    private router: BetterRouter,
  ) {
    this.observe();
  }

  private observe(): void {
    effect(() => {
      if (environment.devkit?.logEffect) console.log('AutoRouting');

      if (!this.authInfoService.isAuthenticated()) {
        return;
      }

      if (!this.authInfoService.selectedAccount()) {
        this.router.navigate(['init-select-account']).then();
        return;
      }

      if (!this.vehicleInfoService.selectedVehicle()) {
        this.router.navigate(['init-select-car']).then();
        return;
      }

      this.router.navigate(['']).then();
    });
  }
}
