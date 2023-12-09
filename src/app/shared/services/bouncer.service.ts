import { inject, Injectable } from '@angular/core';
import { AuthInfoService } from '../../core/auth/services/auth-info.service';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class Bouncer {

  private storageService: StorageService = inject(StorageService);
  private authInfoService: AuthInfoService = inject(AuthInfoService);
  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);

  public clearSession(): void {
    this.clearAccount();
    this.storageService.clearToken();
    this.authInfoService.personId.set(null);
    this.authInfoService.person.set(null);
    this.storageService.clearAllFromSession();
  }

  public clearAccount(): void {
    this.authInfoService.selectedAccountId.set(null);
    this.vehicleInfoService.vin.set(null);
    this.vehicleInfoService.stats.set({
      hvacStatus: null,
      charges: null,
      chargeMode: null,
      batteryStatus: null,
    });
  }

  public disconnect(): void {
    this.clearSession();
    this.storageService.clearGigyaToken();
  }
}
