import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { APP_ROUTES } from './app.routes';
import { provideCommonRootRouter } from './common/router-features';
import { AUTH_PROVIDERS } from './core/auth/auth.providers';
import { ERROR_PROVIDERS } from './core/error/error.providers';
import { RENAULT_PROVIDERS } from './core/renault/renault.providers';
import { APP_INITIALIZER_PROVIDERS } from './initializers/app-initializers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRenaultClient(),
    provideHttpClient(
      withFetch(),
    ),
    provideCommonRootRouter(APP_ROUTES),
    APP_INITIALIZER_PROVIDERS,
    AUTH_PROVIDERS,
    ERROR_PROVIDERS,
    RENAULT_PROVIDERS,
  ],
};
