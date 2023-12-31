import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { __VERSION__ } from '../../../../environments/version';
import { WINDOW } from '../../../shared/tokens/window.token';
import { ErrorBundle } from '../models/error-bundle.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private window = inject(WINDOW);
  private platformId = inject(PLATFORM_ID);

  public handleError(error: any): void {
    console.error(`[ErrorHandler] Handled error -> ${(typeof error === 'string') ? error : JSON.stringify(error)}`);

    const errorBundle: ErrorBundle = {
      version: __VERSION__,
      isBrowser: isPlatformBrowser(this.platformId),
      url: this.window.location.href,
      userAgent: this.window.navigator.userAgent,
      error,
    };

    console.error(`[ErrorHandler] Bundled information -> ${JSON.stringify(errorBundle)}`);
  }
}
