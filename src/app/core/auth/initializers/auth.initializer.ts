import { APP_INITIALIZER, Provider } from '@angular/core';
import { concatMap, finalize, Observable, of, Subscriber } from 'rxjs';
import { Nullable } from '../../../shared/models/shared.model';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { StorageService } from '../../../shared/services/storage.service';
import { WINDOW } from '../../../shared/tokens/window.token';
import { Auth } from '../services/auth.service';

export const INIT_USER_CONTEXT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [Auth, BetterRouter, StorageService, WINDOW],
  useFactory: (auth: Auth, router: BetterRouter, storage: StorageService, { location: { pathname } }: Window) => {
    return () => {
      let observable: Observable<any> = of(undefined);

      if (pathname.startsWith('/login')) return observable;

      const token: Nullable<string> = storage.getToken();
      if (!token) observable = auth.getJWT();

      return new Observable((subscriber: Subscriber<void>) => {
        observable.pipe(
          concatMap(() => auth.getAuthInfos()),
          finalize(() => subscriber.complete()),
        ).subscribe({
          error: (err: any) => {
            console.error(err);
            router.navigate(['login']).then();
          },
        });
      });
    };
  },
};
