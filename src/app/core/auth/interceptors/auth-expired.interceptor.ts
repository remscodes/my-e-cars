import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { Bouncer } from '../../../shared/services/bouncer.service';
import { StorageService } from '../../../shared/services/storage.service';

export function authExpiredInterceptor(): HttpInterceptorFn {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const storageService: StorageService = inject(StorageService);
    const router: BetterRouter = inject(BetterRouter);
    const announcer: Announcer = inject(Announcer);
    const bouncer: Bouncer = inject(Bouncer);

    return next(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status !== 401) return;

          announcer.notify('Votre session a expiré.', 4000);
          bouncer.clearSession();
          storageService.setPreviousUrl(router.routerState.snapshot.url);
          router.navigate(['login']).then();
        },
      }),
    );
  };
}

