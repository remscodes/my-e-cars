import { __VERSION__ } from "@/environments/version";
import { WINDOW } from "@/shared/tokens/window.token";
import { isPlatformBrowser } from '@angular/common';
import { ErrorHandler, Inject, Injectable, PLATFORM_ID } from '@angular/core';

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
      version: __VERSION__,
      isBrowser: isPlatformBrowser(this.platformId),
      url: this.window.location.href,
      userAgent: this.window.navigator.userAgent,
      error
    };

    console.error(`[ErrorHandler] Bundled information -> ${JSON.stringify(errorBundle)}`);
  }
}
