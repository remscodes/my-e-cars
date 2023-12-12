import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HOME_ROUTES } from './home.routes';

export const HOME_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideRouter(HOME_ROUTES),
];
