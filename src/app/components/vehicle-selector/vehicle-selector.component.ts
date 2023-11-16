import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';
import { Optional } from '../../shared/models/shared.model';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrls: ['./vehicle-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, SharedDirectivesModule],
})
export class VehicleSelectorComponent {

  public constructor(
    private vehicleInfoService: VehicleInfoService,
  ) { }

  /* ------- */

  public tag = this.vehicleInfoService.selectedModel;
  public imageSrc: Signal<Optional<string>> = this.vehicleInfoService.selectedImgSrc;
}
