import { AuthInfoService } from '@/auth/services/auth-info.service';
import { Announcer } from '@/shared/services/announcer.service';
import { BetterRouter } from '@/shared/services/better-router.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export function authGuard(): CanActivateFn {
  return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const authInfoService: AuthInfoService = inject(AuthInfoService);
    const router: BetterRouter = inject(BetterRouter);
    const announcer: Announcer = inject(Announcer);

    /* ------- */

    if (!authInfoService.isAuthenticated()) {
      announcer.notify('Veuillez vous connecter pour accéder à cette page.');
      router.navigate(['login']).then();
      return false;
    }

    return true;
  };
}
