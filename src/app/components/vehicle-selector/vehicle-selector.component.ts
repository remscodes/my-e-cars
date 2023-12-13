import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Tag } from '@remscodes/renault-api';
import { VehicleStore } from '../../core/renault/services/vehicle-store.service';
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

  private vehicleStore = inject(VehicleStore);

  public tag: Signal<Optional<Tag>> = this.vehicleStore.model;
  public imageSrc: Signal<Optional<string>> = this.vehicleStore.imgSrc;
}
