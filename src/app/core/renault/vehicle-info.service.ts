import { environment } from '@/environments/environment';
import { IMAGE_ORIENTATION_KEY } from '@/renault/kamereon/kamereon.constants';
import { BatteryStatus } from '@/renault/kamereon/models/battery-status.model';
import { ChargeMode, Charges } from '@/renault/kamereon/models/charge.model';
import { Nullable, Optional } from '@/shared/models/shared.model';
import { StorageService } from '@/shared/services/storage.service';
import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Asset, Rendition, Tag, VehicleLink, Vehicles } from './kamereon/models/vehicle.model';

interface VehicleStats {
  batteryStatus: Nullable<BatteryStatus>;
  chargeMode: Nullable<ChargeMode>;
  charges: Nullable<Charges>;
}

@Injectable({ providedIn: 'root' })
export class VehicleInfoService {

  public constructor(
    private storageService: StorageService,
  ) {
    this.onEffect();
  }

  /* ------- */

  public readonly vehicles: WritableSignal<Nullable<Vehicles>> = signal(null);

  public readonly selectedVin: WritableSignal<Nullable<string>> = signal(this.storageService.getVin());

  public readonly selectedVehicle: Signal<Optional<VehicleLink>> = computed(() => {
    return this.vehicles()
      ?.vehicleLinks
      ?.find((vehicle: VehicleLink) => vehicle.vin === this.selectedVin());
  }, {
    equal: (a, b) => a?.vin === b?.vin,
  });

  public readonly selectedModel: Signal<Optional<Tag>> = computed(() => {
    return this.selectedVehicle()
      ?.vehicleDetails
      ?.model;
  });

  public readonly selectedImgSrc: Signal<Optional<string>> = computed(() => {
    return this.selectedVehicle()
      ?.vehicleDetails
      ?.assets
      ?.find(({ viewpoint }: Asset) => (viewpoint === IMAGE_ORIENTATION_KEY.iso))
      ?.renditions
      ?.find(({ resolutionType }: Rendition) => resolutionType?.endsWith('SMALL'))
      ?.url;
  });

  private readonly lastStats: WritableSignal<VehicleStats> = signal({
    batteryStatus: null,
    chargeMode: null,
    charges: null,
  });

  public readonly batteryStatus: Signal<Nullable<BatteryStatus>> = computed(() => this.lastStats().batteryStatus);
  public readonly chargeMode: Signal<Nullable<ChargeMode>> = computed(() => this.lastStats().chargeMode);
  public readonly charges: Signal<Nullable<Charges>> = computed(() => this.lastStats().charges);

  /* ------- */

  public updateBatteryStatus(batteryStatus: BatteryStatus): void {
    this.lastStats.update((stats: VehicleStats) => ({
      ...stats,
      batteryStatus,
    }));
  }

  public updateCharges(charges: Charges): void {
    this.lastStats.update((stats: VehicleStats) => ({
      ...stats,
      charges,
    }));
  }

  public updateChargeMode(chargeMode: ChargeMode): void {
    this.lastStats.update((stats: VehicleStats) => ({
      ...stats,
      chargeMode,
    }));
  }

  private onEffect(): void {
    effect(() => {
      const vin: Nullable<string> = this.selectedVin();

      if (environment.devkit?.logEffect) console.info(`Vin : ${vin}`);

      (vin)
        ? this.storageService.setVin(vin)
        : this.storageService.clearVin();
    });
  }
}
