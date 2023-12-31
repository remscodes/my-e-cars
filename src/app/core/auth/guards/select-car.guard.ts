import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Announcer } from '../../../shared/services/announcer.service';
import { BetterRouter } from '../../../shared/services/better-router.service';
import { AuthStore } from '../services/auth-store.service';

export function selectCarGuard(): CanActivateFn {
  return () => {
    const authStore = inject(AuthStore);
    const router = inject(BetterRouter);
    const announcer = inject(Announcer);

    if (!authStore.accountId()) {
      announcer.notify('Vous devez choisir un compte avant de sélectionner votre voiture.');
      router.navigate(['select-account']).then();
      return false;
    }

    return true;
  };
}
