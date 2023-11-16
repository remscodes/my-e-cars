import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonChildRouter } from '../../common/router-features';
import { HOME_ROUTES } from './home.routes';

export const HOME_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonChildRouter(HOME_ROUTES),
];
