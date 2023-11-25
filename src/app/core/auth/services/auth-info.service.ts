import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { AccountInfo, Person } from '@remscodes/renault-api';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthInfoService {

  public constructor(
    private storageService: StorageService,
  ) {
    this.onEffect();
  }

  public readonly personId: WritableSignal<Nullable<string>> = signal(null);
  public readonly person: WritableSignal<Nullable<Person>> = signal(null);

  public readonly selectedAccountId: WritableSignal<Nullable<string>> = signal(this.storageService.getAccountId());

  public readonly selectedAccount: Signal<Optional<AccountInfo>> = computed(() => {
    return this.person()?.accounts?.find(acc => acc.accountId === this.selectedAccountId());
  });

  public isAuthenticated(): boolean {
    return !!this.person();
  }

  private onEffect(): void {
    effect(() => {
      const accountId: Nullable<string> = this.selectedAccountId();

      (accountId)
        ? this.storageService.setAccountId(accountId)
        : this.storageService.clearAccountId();
    });
  }
}
