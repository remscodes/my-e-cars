import { EnvironmentProviders, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ACCOUNT_ROUTES } from './account.routes';

export const ACCOUNT_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideRouter(ACCOUNT_ROUTES),
];
