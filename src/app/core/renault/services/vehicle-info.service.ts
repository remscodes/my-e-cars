import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BatteryStatus, ChargeMode, Charges, IMAGE_ORIENTATION_KEY, VehicleDetails, VehicleLink, Vehicles } from '@remscodes/renault-api';
import { environment } from '../../../../environments/environment';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

interface VehicleStats {
  batteryStatus: Nullable<BatteryStatus>;
  chargeMode: Nullable<ChargeMode>;
  charges: Nullable<Charges>;
}

@Injectable({ providedIn: 'root' })
export class VehicleInfoService {

  public constructor() {
    this.observe();
  }

  private storageService: StorageService = inject(StorageService);

  public vehicles: WritableSignal<Nullable<Vehicles>> = signal(null);

  public selectedVin: WritableSignal<Nullable<string>> = signal(this.storageService.getVin());

  public selectedVehicle: Signal<Optional<VehicleLink>> = computed(() => {
    return this.vehicles()
      ?.vehicleLinks
      ?.find((vehicle: VehicleLink) => vehicle.vin === this.selectedVin());
  }, {
    equal: (a, b) => a?.vin === b?.vin,
  });

  public selectedModel: Signal<Optional<VehicleDetails['model']>> = computed(() => {
    return this.selectedVehicle()
      ?.vehicleDetails
      ?.model;
  });

  public selectedImgSrc: Signal<Optional<string>> = computed(() => {
    return this.selectedVehicle()
      ?.vehicleDetails
      ?.assets
      ?.find(({ viewpoint }) => (viewpoint === IMAGE_ORIENTATION_KEY.iso))
      ?.renditions
      ?.find(({ resolutionType }) => resolutionType?.endsWith('SMALL'))
      ?.url;
  });

  private lastStats: WritableSignal<VehicleStats> = signal({
    batteryStatus: null,
    chargeMode: null,
    charges: null,
  });

  public batteryStatus: Signal<Nullable<BatteryStatus>> = computed(() => this.lastStats().batteryStatus);
  public chargeMode: Signal<Nullable<ChargeMode>> = computed(() => this.lastStats().chargeMode);
  public charges: Signal<Nullable<Charges>> = computed(() => this.lastStats().charges);

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

  private observe(): void {
    effect(() => {
      const vin: Nullable<string> = this.selectedVin();
      if (!vin) return;

      if (environment.devkit?.logEffect) console.info(`Selected Vin : ${vin}`);
      this.storageService.setVin(vin);
    });
  }
}
