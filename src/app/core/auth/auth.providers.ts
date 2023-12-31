import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { PreloadAllModules, withPreloading } from '@angular/router';
import { provideRootRouter } from '../../common/router-features';
import { AUTH_ROUTES } from './auth.routes';
import { AUTH_INITIALIZER_PROVIDERS } from './initializers/auth.initializer';
import { authExpiredInterceptor } from './interceptors/auth-expired.interceptor';

export const AUTH_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideHttpClient(withInterceptors([
    authExpiredInterceptor(),
  ])),
  AUTH_INITIALIZER_PROVIDERS,
  provideRootRouter(AUTH_ROUTES,
    withPreloading(PreloadAllModules),
  ),
];
