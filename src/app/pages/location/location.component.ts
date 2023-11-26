import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxKamereonClient } from '@remscodes/ngx-renault-api-client';
import { VehicleLocation } from '@remscodes/renault-api';
import { VehicleInfoService } from '../../core/renault/services/vehicle-info.service';
import { FreemiumMapComponent } from './components/freemium-map/freemium-map.component';

@Component({
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  standalone: true,
  imports: [
    FreemiumMapComponent,
  ],
})
export class LocationComponent implements OnInit {

  private destroyRef: DestroyRef = inject(DestroyRef);
  private kamereon: NgxKamereonClient = inject(NgxKamereonClient);
  private vehicleInfo: VehicleInfoService = inject(VehicleInfoService);

  public center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  public markerPosition: Partial<google.maps.LatLngLiteral> = {};

  public ngOnInit(): void {
    this.kamereon.readLocation(this.vehicleInfo.selectedVin()!).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: ({ gpsLatitude, gpsLongitude }: VehicleLocation) => {
        this.center.lng = gpsLongitude!;
        this.center.lat = gpsLatitude!;

        this.markerPosition.lng = gpsLongitude!;
        this.markerPosition.lat = gpsLatitude!;
      },
    });
  }
}
