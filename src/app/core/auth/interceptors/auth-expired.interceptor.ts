import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { Bouncer } from '../../../shared/services/bouncer.service';
import { StorageService } from '../../../shared/services/storage.service';

export function authExpiredInterceptor(): HttpInterceptorFn {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const storage = inject(StorageService);
    const router = inject(BetterRouter);
    const announcer = inject(Announcer);
    const bouncer = inject(Bouncer);

    return next(req).pipe(
      tap({
        error: ({ status }: HttpErrorResponse) => {
          if (status !== 401) return;

          announcer.notify('Votre session a expiré.', 4000);
          bouncer.clearSession();
          storage.setPreviousUrl(router.routerState.snapshot.url);
          router.navigate(['login']).then();
        },
      }),
    );
  };
}

