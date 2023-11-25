import { APP_INITIALIZER, Provider } from '@angular/core';
import { finalize, Observable, of, Subscriber } from 'rxjs';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { WINDOW } from '../../../shared/tokens/window.token';
import { AuthService } from '../services/auth.service';

export const INIT_USER_CONTEXT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [AuthService, BetterRouter, WINDOW],
  useFactory: (authService: AuthService, router: BetterRouter, mWindow: Window) => {
    return () => {
      if (mWindow.location.pathname.startsWith('/login')) return of(undefined);

      return new Observable((subscriber: Subscriber<void>) => {
        authService.getAuthInfos().pipe(
          finalize(() => subscriber.complete()),
        ).subscribe({
          error: () => {
            router.navigate(['login']).then();
          },
        });
      });
    };
  },
};
