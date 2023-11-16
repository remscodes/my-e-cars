import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from '../../../../environments/environment';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  public constructor(
    private storageService: StorageService,
    private announcer: Announcer,
    private router: BetterRouter,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          (environment.devkit?.logInterceptedError) && console.error(`Intercepted error on request : ${request.url}, message : ${JSON.stringify(err)}`);

          if (this.hasToBeSkipped(err)) return;

          switch (err.status) {
            case 502:
              this.announcer.warn('Erreur durant le transfère de la requête (502).');
              break;

            case 503 :
              this.announcer.warn('Serveur indisponible (503).');
              this.storageService.setPreviousUrl(this.router.routerState.snapshot.url);
              this.router.navigate(['503']).then();
              break;

            case 504 :
              this.announcer.warn('Aucune réponse n\'a été reçue à temps (504).');
              break;

            default :
              this.announcer.warn(`Une erreur s\'est produite (${err.status}).`);
          }
        },
      }),
    );
  }

  private hasToBeSkipped({ status }: HttpErrorResponse): boolean {
    return this.announcer.isErrorAnnounceActive
      || (status === 401);
  }
}
