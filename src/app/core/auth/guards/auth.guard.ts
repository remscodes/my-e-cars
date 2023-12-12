import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { AuthStoreService } from '../services/auth-store.service';

export function authGuard(): CanActivateFn {
  return () => {
    const authInfo = inject(AuthStoreService);
    const router = inject(BetterRouter);
    const announcer = inject(Announcer);

    return true;

    if (!authInfo.isAuth()) {
      announcer.notify('Veuillez vous connecter pour accéder à cette page.');
      router.navigate(['login']).then();
      return false;
    }

    return true;
  };
}
