import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthExpiredInterceptor } from '../core/auth/interceptors/auth-expired.interceptor';
import { AuthInterceptor } from '../core/auth/interceptors/auth.interceptor';
import { ServerErrorInterceptor } from '../core/error/interceptors/server-error.interceptor';

export const appInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorInterceptor,
    multi: true,
  },
];
