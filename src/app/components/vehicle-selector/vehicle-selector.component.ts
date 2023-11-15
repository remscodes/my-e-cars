import { Tag } from '@/renault/kamereon/models/vehicle.model';
import { VehicleInfoService } from '@/renault/vehicle-info.service';
import { Optional } from '@/shared/models/shared.model';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleSelectorComponent {

  public constructor(
    private vehicleInfoService: VehicleInfoService
  ) { }

  /* ------- */

  public tag: Signal<Optional<Tag>> = this.vehicleInfoService.selectedModel;
  public imageSrc: Signal<Optional<string>> = this.vehicleInfoService.selectedImgSrc;
}
