import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { Bouncer } from '../../../shared/services/bouncer.service';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

  public constructor(
    private storageService: StorageService,
    private router: BetterRouter,
    private announcer: Announcer,
    private bouncer: Bouncer
  ) { }

  /* ------- */

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) this.closeSession();
        }
      })
    );
  }

  public closeSession(): void {
    this.announcer.notify('Votre session a expiré.', 4000);

    this.bouncer.clearSession();

    this.storageService.setPreviousUrl(this.router.routerState.snapshot.url);

    this.router.navigate(['login']).then();
  }
}
