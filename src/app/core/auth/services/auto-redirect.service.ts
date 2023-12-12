import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { VehicleInfoService } from '../../renault/services/vehicle-info.service';
import { AuthStoreService } from './auth-store.service';

@Injectable({ providedIn: 'root' })
export class AutoRedirect {

  public constructor() {
    this.observe();
  }

  private authStore = inject(AuthStoreService);
  private vehicleInfo = inject(VehicleInfoService);
  private router = inject(BetterRouter);

  private observe(): void {
    effect(() => {
      if (!this.authStore.isAuth()) return;

      if (!this.authStore.accountId()) {
        if (environment.devkit?.logEffect) console.log('AutoRouting /init-select-account');
        this.router.navigate(['init-select-account']).then();
        return;
      }

      if (!this.vehicleInfo.vehicle()) {
        if (environment.devkit?.logEffect) console.log('AutoRouting /init-select-car');
        this.router.navigate(['init-select-car']).then();
        return;
      }

      if (environment.devkit?.logEffect) console.log('AutoRouting /');
      this.router.navigate(['']).then();
    });
  }
}
