import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { NgxRenaultSession } from '@remscodes/ngx-renault-api-client';
import { BatteryStatus, ChargeMode, Charges, HvacStatus, IMAGE_ORIENTATION_KEY, VehicleDetails, VehicleLink, Vehicles } from '@remscodes/renault-api';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';
import { VehicleStats } from '../models/vehicle-stats.model';

@Injectable({ providedIn: 'root' })
export class VehicleStore {

  public constructor() {
    this.$storeVin();
  }

  private storage = inject(StorageService);
  private session = inject(NgxRenaultSession);

  public vehicles: WritableSignal<Nullable<Vehicles>> = signal(null);
  public vin: WritableSignal<Nullable<string>> = signal(this.storage.getVin());

  public vehicle: Signal<Optional<VehicleLink>> = computed(() => {
    return this.vehicles()?.vehicleLinks?.find(({ vin }) => vin === this.vin());
  }, { equal: (a, b) => a?.vin === b?.vin });

  public model: Signal<Optional<VehicleDetails['model']>> = computed(() => {
    return this.vehicle()?.vehicleDetails?.model;
  });

  public imgSrc: Signal<Optional<string>> = computed(() => {
    return this.vehicle()?.vehicleDetails?.assets
      ?.find(({ viewpoint }) => (viewpoint === IMAGE_ORIENTATION_KEY.iso))?.renditions
      ?.find(({ resolutionType }) => resolutionType?.endsWith('SMALL'))?.url;
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

  public updateBatteryStatus(value: BatteryStatus): void {
    this.updateStats('batteryStatus', value);
  }

  public updateCharges(value: Charges): void {
    this.updateStats('charges', value);
  }

  public updateChargeMode(value: ChargeMode): void {
    this.updateStats('chargeMode', value);
  }

  public updateHvacStatus(value: HvacStatus): void {
    this.updateStats('hvacStatus', value);
  }

  private updateStats(statKey: keyof VehicleStats, value: any): void {
    this.stats.update(stats => ({ ...stats, [statKey]: value }));
  }

  public clearStats(): void {
    this.stats.set({
      batteryStatus: null,
      chargeMode: null,
      charges: null,
      hvacStatus: null,
    });
  }

  private $storeVin(): void {
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
