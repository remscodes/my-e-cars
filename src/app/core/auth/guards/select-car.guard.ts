import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { AuthInfoService } from '../services/auth-info.service';

export function selectCarGuard(): CanActivateFn {
  return () => {
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
