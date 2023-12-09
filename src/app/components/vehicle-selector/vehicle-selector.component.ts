import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Tag } from '@remscodes/renault-api';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { RigidImageDirective } from '../../shared/directives/rigid-image.directive';
import { Optional } from '../../shared/models/shared.model';

@Component({
  selector: 'app-vehicle-selector',
  templateUrl: './vehicle-selector.component.html',
  styleUrl: './vehicle-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgOptimizedImage,
    RigidImageDirective,
  ],
})
export class VehicleSelectorComponent {

  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);

  public tag: Signal<Optional<Tag>> = this.vehicleInfoService.model;
  public imageSrc: Signal<Optional<string>> = this.vehicleInfoService.imgSrc;
}
