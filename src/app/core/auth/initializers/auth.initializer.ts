import { APP_INITIALIZER, Provider } from '@angular/core';
import { concatMap, finalize, Observable, of, Subscriber } from 'rxjs';
import { Nullable } from '../../../shared/models/shared.model';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { StorageService } from '../../../shared/services/storage.service';
import { WINDOW } from '../../../shared/tokens/window.token';
import { AuthService } from '../services/auth.service';

export const INIT_USER_CONTEXT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [AuthService, BetterRouter, WINDOW, StorageService],
  useFactory: (authService: AuthService, router: BetterRouter, mWindow: Window, storage: StorageService) => {
    return () => {
      let observable: Observable<any> = of(undefined);

      if (mWindow.location.pathname.startsWith('/login')) return observable;

      const token: Nullable<string> = storage.getToken();
      if (!token) observable = authService.getJWT();

      return new Observable((subscriber: Subscriber<void>) => {
        observable.pipe(
          concatMap(() => authService.getAuthInfos()),
          finalize(() => subscriber.complete()),
        ).subscribe({
          error: (err) => {
            console.error(err);
            router.navigate(['login']).then();
          },
        });
      });
    };
  },
};
