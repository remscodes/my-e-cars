import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, withPreloading } from '@angular/router';
import { provideRenaultClient } from '@remscodes/ngx-renault-api-client';
import { APP_ROUTES } from './app.routes';
import { provideRootRouter } from './common/router-features';
import { AUTH_PROVIDERS } from './core/auth/auth.providers';
import { ERROR_PROVIDERS } from './core/error/error.providers';
import { MATERIAL_PROVIDERS } from './core/material/material.provider';
import { RENAULT_PROVIDERS } from './core/renault/renault.providers';
import { APP_INITIALIZER_PROVIDERS } from './initializers/app-initializers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRenaultClient(),
    provideHttpClient(
      withFetch(),
    ),
    APP_INITIALIZER_PROVIDERS,
    RENAULT_PROVIDERS,
    AUTH_PROVIDERS,
    ERROR_PROVIDERS,
    MATERIAL_PROVIDERS,
    provideRootRouter(APP_ROUTES,
      withPreloading(PreloadAllModules),
    ),
  ],
};
