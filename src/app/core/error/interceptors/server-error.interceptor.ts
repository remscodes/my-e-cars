import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { tap } from "rxjs";
import { environment } from '../../../../environments/environment';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { StorageService } from '../../../shared/services/storage.service';

export function serverErrorInterceptor(): HttpInterceptorFn {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const storageService: StorageService = inject(StorageService);
    const announcer: Announcer = inject(Announcer);
    const router: BetterRouter = inject(BetterRouter);

    return next(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          (environment.devkit?.logInterceptedError) && console.error(`Intercepted error on request : ${req.url}, message : ${JSON.stringify(err)}`);

          if (err.status < 500 || announcer.isErrorAnnounceActive) return;

          switch (err.status) {
            case 502:
              announcer.warn('Erreur durant le transfère de la requête (502).');
              break;

            case 503 :
              announcer.warn('Serveur indisponible (503).');
              storageService.setPreviousUrl(router.routerState.snapshot.url);
              router.navigate(['503']).then();
              break;

            case 504 :
              announcer.warn('Aucune réponse n\'a été reçue à temps (504).');
              break;

            default :
              announcer.warn(`Une erreur s\'est produite (${err.status}).`);
          }
        },
      }),
    );
  };
}
