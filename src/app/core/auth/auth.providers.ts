import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideCommonRootRouter } from '../../common/router-features';
import { AUTH_ROUTES } from './auth.routes';
import { INIT_USER_CONTEXT_PROVIDER } from './initializers/auth-initializer';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.interceptor';

export const AUTH_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideCommonRootRouter(AUTH_ROUTES),
  INIT_USER_CONTEXT_PROVIDER,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
];
