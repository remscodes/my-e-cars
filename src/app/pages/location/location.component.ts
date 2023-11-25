import { Component, DestroyRef, inject } from '@angular/core';
import { FreemiumMapComponent } from './components/freemium-map/freemium-map.component';

@Component({
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
  standalone: true,
  imports: [
    FreemiumMapComponent,
  ],
})
export class LocationComponent {

  private destroyRef: DestroyRef = inject(DestroyRef);

  public center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  public markerPosition: Partial<google.maps.LatLngLiteral> = {};

  public ngOnInit(): void {
    // this.vehicleService.readLocation().pipe(
    //   takeUntilDestroyed(this.destroyRef),
    // ).subscribe({
    //   next: ({ body: loc }: HttpResponse<VehicleLocation>) => {
    //     if (!loc) return;
    //
    //     this.center.lng = loc.gpsLongitude!;
    //     this.center.lat = loc.gpsLatitude!;
    //
    //     this.markerPosition.lng = loc.gpsLongitude!;
    //     this.markerPosition.lat = loc.gpsLatitude!;
    //   },
    // });
  }
}
