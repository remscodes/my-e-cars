import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { NgxRenaultSession } from '@remscodes/ngx-renault-api-client';
import { AccountInfo, Person } from '@remscodes/renault-api';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {

  public constructor() {
    this.onEffect();
  }

  private storage = inject(StorageService);
  private session = inject(NgxRenaultSession);

  public personId: WritableSignal<Nullable<string>> = signal(null);
  public person: WritableSignal<Nullable<Person>> = signal(null);

  public accountId: WritableSignal<Nullable<string>> = signal(this.storage.getAccountId());

  public account: Signal<Optional<AccountInfo>> = computed(() => {
    return this.person()?.accounts?.find(acc => acc.accountId === this.accountId());
  });

  public isAuth(): boolean {
    return !!this.person();
  }

  private onEffect(): void {
    effect(() => {
      const accountId: Nullable<string> = this.accountId();

      if (accountId) {
        this.storage.setAccountId(accountId);
        this.session.accountId = accountId;
      }
      else {
        this.storage.clearAccountId();
        this.session.accountId = undefined;
      }
    });
  }
}
