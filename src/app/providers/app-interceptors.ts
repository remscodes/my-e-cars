import { AuthExpiredInterceptor } from '@/auth/interceptors/auth-expired.interceptor';
import { AuthInterceptor } from '@/auth/interceptors/auth.interceptor';
import { ServerErrorInterceptor } from '@/error/interceptors/server-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

export const appInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthExpiredInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorInterceptor,
    multi: true
  }
];
