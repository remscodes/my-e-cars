import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Optional } from '../../../../shared/models/shared.model';
import { WINDOW } from '../../../../shared/tokens/window.token';

@Component({
  selector: 'app-freemium-map',
  templateUrl: './freemium-map.component.html',
  styleUrl: './freemium-map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class FreemiumMapComponent implements OnInit, OnChanges {

  private mWindow: Window = inject(WINDOW);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  @Input({ required: true })
  public topic!: string;

  @Input()
  public center?: google.maps.LatLngLiteral;

  @Input()
  public zoom?: number = 18;

  public url: URL = new URL('https://www.google.com/maps/embed/v1/place');

  public src: Optional<SafeUrl>;

  public ngOnInit(): void {
    this.url.searchParams.set('key', this.mWindow.GOOGLE_MAPS_API_KEY!);
    this.url.searchParams.set('q', this.topic);
    this.url.searchParams.set('center', `${this.center?.lat},${this.center?.lng}`);

    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.url.href);
  }

  public ngOnChanges(changes: SimpleChanges): void {

  }
}
