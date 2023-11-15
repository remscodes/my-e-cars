import { AuthInfoService } from '@/auth/services/auth-info.service';
import { environment } from '@/environments/environment';
import { Nullable } from '@/shared/models/shared.model';
import { StorageService } from '@/shared/services/storage.service';
import { addHeaderOnCondition, addParamOnCondition } from '@/shared/utils/request-util';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(
    private storageService: StorageService,
    private authInfoService: AuthInfoService
  ) { }

  /* ------- */

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return (request.url.includes('/accounts.'))
      ? this.interceptGigya(request, next)
      : this.interceptKamereon(request, next);
  }

  private interceptGigya(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setParams: {
        ApiKey: environment.gigya.key
      }
    });

    const gigyaToken: Nullable<string> = this.storageService.getGigyaToken();
    request = addParamOnCondition(request, !!gigyaToken, 'login_token', gigyaToken);

    return next.handle(request);
  }

  private interceptKamereon(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        apikey: environment.kamereon.key
      },
      setParams: {
        country: environment.config.country
      }
    });

    const token: Nullable<string> = this.authInfoService.token();
    request = addHeaderOnCondition(request, !!token, 'x-gigya-id_token', token);

    return next.handle(request);
  }
}

// export function authInterceptor(): HttpInterceptorFn {
//   return (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
//     return (request.url.includes('/accounts.'))
//       ? interceptGigya(request, next)
//       : interceptKamereon(request, next);
//   };
// }
//
// function interceptGigya(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   const storageService = inject(StorageService);
//
//   request = request.clone({
//     setParams: {
//       ApiKey: environment.gigya.key
//     }
//   });
//
//   const gigyaToken: Nullable<string> = storageService.getGigyaToken();
//   request = addParamOnCondition(request, !!gigyaToken, 'login_token', gigyaToken);
//
//   return next(request);
// }
//
// function interceptKamereon(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   const authInfoService = inject(AuthInfoService);
//
//   request = request.clone({
//     setHeaders: {
//       apikey: environment.kamereon.key
//     },
//     setParams: {
//       country: environment.config.country
//     }
//   });
//
//   const token: Nullable<string> = authInfoService.token();
//   request = addHeaderOnCondition(request, !!token, 'x-gigya-id_token', token);
//
//   return next(request);
// }
