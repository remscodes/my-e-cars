import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { NgxRenaultSession } from '@remscodes/ngx-renault-api-client';
import { Account, Person } from '@remscodes/renault-api';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {

  public constructor() {
    this.$storeAccountId();
  }

  private storage = inject(StorageService);
  private session = inject(NgxRenaultSession);

  public personId = signal<Nullable<string>>(null);
  public person = signal<Nullable<Person>>(null);

  public accountId = signal<Nullable<string>>(this.storage.getAccountId());
  public account = computed<Optional<Account>>(() => {
    return this.person()?.accounts?.find(acc => acc.accountId === this.accountId());
  });

  public isAuth = computed<boolean>(() => !!this.person());

  private $storeAccountId(): void {
    effect(() => {
      const accountId: Nullable<string> = this.accountId();
      if (!accountId) {
        this.storage.clearAccountId();
        this.session.accountId = undefined;
        return;
      }

      this.storage.setAccountId(accountId);
      this.session.accountId = accountId;
    });
  }
}
