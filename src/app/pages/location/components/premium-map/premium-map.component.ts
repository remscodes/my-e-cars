import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-premium-map',
  templateUrl: './premium-map.component.html',
  styleUrls: ['./premium-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    GoogleMapsModule,
  ],
})
export class PremiumMapComponent implements OnInit {

  @Input({ required: true })
  public center!: google.maps.LatLngLiteral;

  public zoom: number = 18;

  public markerPosition: Partial<google.maps.LatLngLiteral> = {};

  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    keyboardShortcuts: false,
    clickableIcons: false,
  };

  public ngOnInit(): void {

  }

  public isMarkerLiteral(marker: Partial<google.maps.LatLngLiteral>): marker is google.maps.LatLngLiteral {
    return (!!marker.lng) && (!!marker.lat);
  }
}
