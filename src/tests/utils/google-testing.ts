// https://github.com/angular/components/blob/main/src/google-maps/google-map/google-map.ts
// https://github.com/angular/components/blob/main/src/google-maps/google-map/google-map.spec.ts

/** default options set to the Googleplex */
export const DEFAULT_OPTIONS: google.maps.MapOptions = {
  center: { lat: 37.421995, lng: - 122.084092 },
  zoom: 17,
  // Note: the type conversion here isn't necessary for our CI, but it resolves a g3 failure.
  mapTypeId: 'roadmap' as unknown as google.maps.MapTypeId,
};

/** Creates a jasmine.SpyObj for a google.maps.Map. */
export function createMapSpy(options: google.maps.MapOptions): jasmine.SpyObj<google.maps.Map> {
  const mapSpy = jasmine.createSpyObj('google.maps.Map', [
    'setOptions',
    'setCenter',
    'setZoom',
    'setMap',
    'addListener',
    'fitBounds',
    'panBy',
    'panTo',
    'panToBounds',
    'getBounds',
    'getCenter',
    'getClickableIcons',
    'getHeading',
    'getMapTypeId',
    'getProjection',
    'getStreetView',
    'getTilt',
    'getZoom',
    'setMapTypeId',
  ]);
  mapSpy.addListener.and.returnValue({ remove: () => {} });
  return mapSpy;
}

export function createMapConstructorSpy(
  mapSpy: jasmine.SpyObj<google.maps.Map>,
  apiLoaded = true,
): jasmine.Spy {
  // The spy target function cannot be an arrow-function as this breaks when created through `new`.
  const mapConstructorSpy = jasmine.createSpy('Map constructor', function () {
    return mapSpy;
  });
  const testingWindow: any = window;
  if (apiLoaded) {
    testingWindow.google = {
      maps: {
        'Map': mapConstructorSpy,
      },
    };
  }
  return mapConstructorSpy;
}

// https://github.com/angular/components/blob/main/src/google-maps/map-marker/map-marker.ts
// https://github.com/angular/components/blob/main/src/google-maps/map-marker/map-marker.spec.ts

/**
 * Default options for the Google Maps marker component. Displays a marker
 * at the Googleplex.
 */
export const DEFAULT_MARKER_OPTIONS = {
  position: { lat: 37.421995, lng: - 122.084092 },
};

/** Creates a jasmine.SpyObj for a google.maps.Marker */
export function createMarkerSpy(
  options: google.maps.MarkerOptions,
): jasmine.SpyObj<google.maps.Marker> {
  const markerSpy = jasmine.createSpyObj('google.maps.Marker', [
    'setOptions',
    'setMap',
    'addListener',
    'getAnimation',
    'getClickable',
    'getCursor',
    'getDraggable',
    'getIcon',
    'getLabel',
    'getOpacity',
    'getPosition',
    'getShape',
    'getTitle',
    'getVisible',
    'getZIndex',
  ]);
  markerSpy.addListener.and.returnValue({ remove: () => {} });
  return markerSpy;
}

/** Creates a jasmine.Spy to watch for the constructor of a google.maps.Marker */
export function createMarkerConstructorSpy(
  markerSpy: jasmine.SpyObj<google.maps.Marker>,
): jasmine.Spy {
  // The spy target function cannot be an arrow-function as this breaks when created through `new`.
  const markerConstructorSpy = jasmine.createSpy('Marker constructor', function () {
    return markerSpy;
  });
  const testingWindow: any = window;
  if (testingWindow.google && testingWindow.google.maps) {
    testingWindow.google.maps['Marker'] = markerConstructorSpy;
  }
  else {
    testingWindow.google = {
      maps: {
        'Marker': markerConstructorSpy,
      },
    };
  }
  return markerConstructorSpy;
}
