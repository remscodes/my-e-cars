import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { VehicleDetails } from '@remscodes/renault-api';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';
import { Optional } from '../../shared/models/shared.model';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrl: './vehicle-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    SharedDirectivesModule,
  ],
})
export class VehicleSelectorComponent {

  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);

  public tag: Signal<Optional<VehicleDetails['model']>> = this.vehicleInfoService.selectedModel;
  public imageSrc: Signal<Optional<string>> = this.vehicleInfoService.selectedImgSrc;
}
