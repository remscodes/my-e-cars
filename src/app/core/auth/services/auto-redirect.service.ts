import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { VehicleInfoService } from '../../renault/services/vehicle-info.service';
import { AuthInfoService } from './auth-info.service';

@Injectable({ providedIn: 'root' })
export class AutoRedirect {

  public constructor() {
    this.observe();
  }

  private authInfoService: AuthInfoService = inject(AuthInfoService);
  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);
  private router: BetterRouter = inject(BetterRouter);

  private observe(): void {
    effect(() => {
      if (!this.authInfoService.isAuth()) return;

      if (!this.authInfoService.selectedAccount()) {
        if (environment.devkit?.logEffect) console.log('AutoRouting /init-select-account');
        this.router.navigate(['init-select-account']).then();
        return;
      }

      if (!this.vehicleInfoService.selectedVehicle()) {
        if (environment.devkit?.logEffect) console.log('AutoRouting /init-select-car');
        this.router.navigate(['init-select-car']).then();
        return;
      }

      if (environment.devkit?.logEffect) console.log('AutoRouting /');
      this.router.navigate(['']).then();
    });
  }
}
