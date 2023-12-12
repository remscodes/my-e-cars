import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { PreloadAllModules, withPreloading } from '@angular/router';
import { provideRootRouter } from '../../common/router-features';
import { ERROR_ROUTES } from './error.routes';
import { serverErrorInterceptor } from './interceptors/server-error.interceptor';

export const ERROR_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  provideRootRouter(ERROR_ROUTES, withPreloading(PreloadAllModules)),
  provideHttpClient(withInterceptors([serverErrorInterceptor()])),
];
