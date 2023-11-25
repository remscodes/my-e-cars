import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { __VERSION__ } from '../../../../environments/version';
import { WINDOW } from '../../../shared/tokens/window.token';

interface ErrorBundle {
  version: string;
  url: string;
  userAgent: string;
  isBrowser: boolean;
  error: any;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  private window: Window = inject(WINDOW);
  private platformId: Object = inject(PLATFORM_ID);

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
