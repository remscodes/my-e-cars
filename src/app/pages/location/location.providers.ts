import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonChildRouter } from '../../common/router-features';
import { LOCATION_ROUTES } from './location.routes';

export const LOCATION_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonChildRouter(LOCATION_ROUTES),
];
