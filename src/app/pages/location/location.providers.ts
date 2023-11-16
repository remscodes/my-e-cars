import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonRootRouter } from '../../common/router-features';
import { LOCATION_ROUTES } from './location.routes';

export const LOCATION_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonRootRouter(LOCATION_ROUTES),
];
