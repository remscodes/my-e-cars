import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from '../../core/auth/services/auth-store.service';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class Bouncer {

  private storage = inject(StorageService);
  private authInfo = inject(AuthStoreService);
  private vehicleInfo = inject(VehicleInfoService);

  public clearSession(): void {
    this.clearAccount();
    this.authInfo.personId.set(null);
    this.authInfo.person.set(null);
    this.storage.clearAllFromSession();
  }

  public clearAccount(): void {
    this.authInfo.accountId.set(null);
    this.vehicleInfo.vin.set(null);
    this.vehicleInfo.resetStats();
  }

  public disconnect(): void {
    this.clearSession();
    this.storage.clearGigyaToken();
  }
}
