import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonRootRouter } from '../../common/router-features';
import { ERROR_ROUTES } from './error.routes';
import { serverErrorInterceptor } from './interceptors/server-error.interceptor';

export const ERROR_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonRootRouter(ERROR_ROUTES),
  provideHttpClient(
    withInterceptors([serverErrorInterceptor()]),
  ),
];
