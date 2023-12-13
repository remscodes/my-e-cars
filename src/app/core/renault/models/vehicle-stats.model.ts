import { BatteryStatus, ChargeMode, Charges, HvacStatus } from '@remscodes/renault-api';
import { Nullable } from '../../../shared/models/shared.model';

export interface VehicleStats {
  batteryStatus: Nullable<BatteryStatus>;
  chargeMode: Nullable<ChargeMode>;
  charges: Nullable<Charges>;
  hvacStatus: Nullable<HvacStatus>;
}
