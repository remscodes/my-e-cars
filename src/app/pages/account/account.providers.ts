import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonRootRouter } from '../../common/router-features';
import { ACCOUNT_ROUTES } from './account.routes';

export const ACCOUNT_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonRootRouter(ACCOUNT_ROUTES),
];
