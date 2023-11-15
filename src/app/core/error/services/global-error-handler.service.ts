import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, Inject, Injectable, PLATFORM_ID } from '@angular/core';
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

  public constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  public handleError(error: any): void {
    console.error(`[ErrorHandler] Handled error -> ${(typeof error === 'string') ? error : JSON.stringify(error)}`);

    const errorBundle: ErrorBundle = {
      version: "1",
      isBrowser: isPlatformBrowser(this.platformId),
      url: this.window.location.href,
      userAgent: this.window.navigator.userAgent,
      error
    };

    console.error(`[ErrorHandler] Bundled information -> ${JSON.stringify(errorBundle)}`);
  }
}
