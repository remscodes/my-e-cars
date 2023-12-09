import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { NgxRenaultSession } from '@remscodes/ngx-renault-api-client';
import { BatteryStatus, ChargeMode, Charges, HvacStatus, IMAGE_ORIENTATION_KEY, VehicleDetails, VehicleLink, Vehicles } from '@remscodes/renault-api';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

interface VehicleStats {
  batteryStatus: Nullable<BatteryStatus>;
  chargeMode: Nullable<ChargeMode>;
  charges: Nullable<Charges>;
  hvacStatus: Nullable<HvacStatus>;
}

@Injectable({ providedIn: 'root' })
export class VehicleInfoService {

  public constructor() {
    this.observeVin();
  }

  private storage = inject(StorageService);
  private session = inject(NgxRenaultSession);

  public vehicles: WritableSignal<Nullable<Vehicles>> = signal(null);
  public vin: WritableSignal<Nullable<string>> = signal(this.storage.getVin());

  public vehicle: Signal<Optional<VehicleLink>> = computed(() => {
    return this.vehicles()?.vehicleLinks?.find(({ vin }) => vin === this.vin());
  }, {
    equal: (a, b) => a?.vin === b?.vin,
  });

  public model: Signal<Optional<VehicleDetails['model']>> = computed(() => {
    return this.vehicle()?.vehicleDetails?.model;
  });

  public imgSrc: Signal<Optional<string>> = computed(() => {
    return this.vehicle()
      ?.vehicleDetails
      ?.assets
      ?.find(({ viewpoint }) => (viewpoint === IMAGE_ORIENTATION_KEY.iso))
      ?.renditions
      ?.find(({ resolutionType }) => resolutionType?.endsWith('SMALL'))
      ?.url;
  });

  public stats: WritableSignal<VehicleStats> = signal({
    batteryStatus: null,
    chargeMode: null,
    charges: null,
    hvacStatus: null,
  });

  public batteryStatus: Signal<Nullable<BatteryStatus>> = computed(() => this.stats().batteryStatus);
  public chargeMode: Signal<Nullable<ChargeMode>> = computed(() => this.stats().chargeMode);
  public charges: Signal<Nullable<Charges>> = computed(() => this.stats().charges);
  public hvacStatus: Signal<Nullable<HvacStatus>> = computed(() => this.stats().hvacStatus);

  public updateBatteryStatus(batteryStatus: BatteryStatus): void {
    this.updateStats('batteryStatus', batteryStatus);
  }

  public updateCharges(charges: Charges): void {
    this.updateStats('charges', charges);
  }

  public updateChargeMode(chargeMode: ChargeMode): void {
    this.updateStats('chargeMode', chargeMode);
  }

  public updateHvacStatus(hvacStatus: HvacStatus): void {
    this.updateStats('hvacStatus', hvacStatus);
  }

  private updateStats(statKey: keyof VehicleStats, value: any): void {
    this.stats.update(stats => ({
      ...stats,
      [statKey]: value,
    }));
  }

  private observeVin(): void {
    effect(() => {
      const vin: Nullable<string> = this.vin();
      if (vin) {
        this.storage.setVin(vin);
        this.session.vin = vin;
      }
      else {
        this.storage.clearVin();
        this.session.vin = undefined;
      }
    });
  }
}
