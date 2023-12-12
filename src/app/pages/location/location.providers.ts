import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LOCATION_ROUTES } from './location.routes';

export const LOCATION_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideRouter(LOCATION_ROUTES),
];
