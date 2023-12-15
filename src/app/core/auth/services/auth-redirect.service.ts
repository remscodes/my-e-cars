import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { VehicleStore } from '../../renault/services/vehicle-store.service';
import { AuthStore } from './auth-store.service';

@Injectable({ providedIn: 'root' })
export class AuthRedirect {

  public constructor() {
    this.observe();
  }

  private authStore = inject(AuthStore);
  private vehicleStore = inject(VehicleStore);
  private router = inject(BetterRouter);

  private observe(): void {
    effect(() => {
      if (!this.authStore.isAuth()) return;

      if (!this.authStore.accountId()) {
        if (environment.devkit?.logEffect) console.log('AutoRouting /select-account');
        this.router.navigate(['select-account']).then();
        return;
      }

      if (this.vehicleStore.vehicles() && !this.vehicleStore.vehicle()) {
        if (environment.devkit?.logEffect) console.log('AutoRouting /select-car');
        this.router.navigate(['select-car']).then();
        return;
      }

      if (environment.devkit?.logEffect) console.log('AutoRouting /');
      this.router.navigate(['']).then();
    });
  }
}
