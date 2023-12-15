import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../../core/auth/services/auth-store.service';
import { VehicleStore } from '../../core/renault/services/vehicle-store.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class Bouncer {

  private storage = inject(StorageService);
  private authStore = inject(AuthStore);
  private vehicleStore = inject(VehicleStore);

  public clearSession(): void {
    this.clearAccount();
    this.authStore.personId.set(null);
    this.authStore.person.set(null);
    this.storage.clearAllFromSession();
  }

  public clearAccount(): void {
    this.authStore.accountId.set(null);
    this.vehicleStore.vin.set(null);
    this.vehicleStore.clearStats();
  }

  public disconnect(): void {
    this.clearSession();
    this.storage.clearGigyaToken();
  }
}
