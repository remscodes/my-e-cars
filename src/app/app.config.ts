import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_ROUTES } from './app.routes';
import { provideCommonRootRouter } from './common/router-features';
import { AUTH_PROVIDERS } from './core/auth/auth.providers';
import { ERROR_PROVIDERS } from './core/error/error.providers';
import { APP_INITIALIZER_PROVIDERS } from './providers/app-initializers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideCommonRootRouter(APP_ROUTES),

    APP_INITIALIZER_PROVIDERS,
    AUTH_PROVIDERS,
    ERROR_PROVIDERS,
  ],
};
