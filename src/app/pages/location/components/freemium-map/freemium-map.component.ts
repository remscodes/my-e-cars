import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Optional } from '../../../../shared/models/shared.model';
import { WINDOW } from '../../../../shared/tokens/window.token';

@Component({
  selector: 'app-freemium-map',
  standalone: true,
  imports: [],
  templateUrl: './freemium-map.component.html',
  styleUrl: './freemium-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreemiumMapComponent implements OnInit, OnChanges {

  private window = inject(WINDOW);
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true })
  public topic!: string;

  @Input()
  public center?: google.maps.LatLngLiteral;

  @Input()
  public zoom?: number = 18;

  public url = new URL('https://www.google.com/maps/embed/v1/place');

  public src: Optional<SafeUrl>;

  public ngOnInit(): void {
    this.url.searchParams.set('key', this.window.GOOGLE_MAPS_API_KEY!);
    this.url.searchParams.set('q', this.topic);
    this.url.searchParams.set('center', `${this.center?.lat},${this.center?.lng}`);

    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.url.href);
  }

  public ngOnChanges(changes: SimpleChanges): void {

  }
}
