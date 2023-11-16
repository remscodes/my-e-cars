import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonChildRouter } from '../../common/router-features';
import { ACCOUNT_ROUTES } from './account.routes';

export const ACCOUNT_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonChildRouter(ACCOUNT_ROUTES),
];
