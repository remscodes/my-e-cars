import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Announcer } from '../../../shared/services/announcer.service';
import { AuthInfoService } from '../services/auth-info.service';
import { BetterRouter } from '../../../shared/services/better-router.service';

export function selectCarGuard(): CanActivateFn {
  return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
    const authInfoService: AuthInfoService = inject(AuthInfoService);
    const router: BetterRouter = inject(BetterRouter);
    const announcer: Announcer = inject(Announcer);

    if (!authInfoService.selectedAccountId()) {
      announcer.notify('Vous devez choisir un compte avant de sélectionner votre voiture.');
      router.navigate(['init-select-account']).then();
      return false;
    }

    return true;
  };
}
