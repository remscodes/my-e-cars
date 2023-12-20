import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMapConstructorSpy, createMapSpy, createMarkerConstructorSpy, createMarkerSpy, DEFAULT_MARKER_OPTIONS, DEFAULT_OPTIONS } from '../../../../../tests/utils/google-testing';
import { PremiumMapComponent } from './premium-map.component';

describe('PremiumMapComponent', () => {
  let fixture: ComponentFixture<PremiumMapComponent>;
  let component: PremiumMapComponent;

  beforeEach(() => {
    const mapSpy = createMapSpy(DEFAULT_OPTIONS);
    createMapConstructorSpy(mapSpy);
    const markerSpy = createMarkerSpy(DEFAULT_MARKER_OPTIONS);
    createMarkerConstructorSpy(markerSpy).and.callThrough();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumMapComponent],
      providers: [
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumMapComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    (window.google as any) = undefined;
    (window as any).gm_authFailure = undefined;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
