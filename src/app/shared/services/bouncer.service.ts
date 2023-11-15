import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class Bouncer {

  public constructor(
    private storageService: StorageService,
    private authInfoService: AuthInfoService,
    private vehicleInfoService: VehicleInfoService
  ) { }

  /* ------- */

  public clearSession(): void {
    this.switchAccount();
    this.authInfoService.token.set(null);
    this.authInfoService.personId.set(null);
    this.authInfoService.person.set(null);
    this.storageService.clearAllFromSession();
  }

  public switchAccount(): void {
    this.authInfoService.selectedAccountId.set(null);
    this.vehicleInfoService.selectedVin.set(null);
  }

  public disconnect(): void {
    this.clearSession();
    this.storageService.clearGigyaToken();
  }
}
