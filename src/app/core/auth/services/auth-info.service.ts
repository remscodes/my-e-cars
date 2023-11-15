import { Account, Person } from '@/renault/kamereon/models/person.model';
import { Nullable, Optional } from '@/shared/models/shared.model';
import { StorageService } from '@/shared/services/storage.service';
import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthInfoService {

  public constructor(
    private storageService: StorageService
  ) {
    this.onEffect();
  }

  /* ------- */

  public readonly gigyaToken: WritableSignal<Nullable<string>> = signal(this.storageService.getGigyaToken());
  public readonly token: WritableSignal<Nullable<string>> = signal(this.storageService.getToken());

  public readonly personId: WritableSignal<Nullable<string>> = signal(null);
  public readonly person: WritableSignal<Nullable<Person>> = signal(null);

  public readonly selectedAccountId: WritableSignal<Nullable<string>> = signal(this.storageService.getAccountId());

  public readonly selectedAccount: Signal<Optional<Account>> = computed(() => {
    return this.person()
      ?.accounts
      ?.find((account: Account) => account.accountId === this.selectedAccountId());
  });

  /* ------- */

  public isAuthenticated(): boolean {
    return !!this.person();
  }

  private onEffect(): void {
    effect(() => {
      const gigyaToken: Nullable<string> = this.gigyaToken();

      (gigyaToken)
        ? this.storageService.setGigyaToken(gigyaToken)
        : this.storageService.clearGigyaToken();
    });

    effect(() => {

    });

    effect(() => {
      const accountId: Nullable<string> = this.selectedAccountId();

      (accountId)
        ? this.storageService.setAccountId(accountId)
        : this.storageService.clearAccountId();
    });

  }
}
