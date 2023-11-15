import { AuthService } from '@/auth/services/auth.service';
import { BetterRouter } from '@/shared/services/better-router.service';
import { WINDOW } from '@/shared/tokens/window.token';
import { APP_INITIALIZER, Provider } from '@angular/core';
import { finalize, Observable, of, Subscriber } from 'rxjs';

function initUserContext(authService: AuthService, router: BetterRouter, mWindow: Window) {
  return () => {
    if (mWindow.location.pathname.startsWith('/login')) return of(undefined);

    return new Observable((subscriber: Subscriber<void>) => {
      authService.getAuthInfos().pipe(
        finalize(() => subscriber.complete())
      ).subscribe({
        error: () => {
          router.navigate(['login']).then();
        }
      });
    });
  };
}

export const initUserContextProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initUserContext,
  deps: [AuthService, BetterRouter, WINDOW],
  multi: true
};

export const authInitializerProviders: Provider[] = [
  initUserContextProvider
];
