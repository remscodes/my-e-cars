import { computed, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { NgxRenaultSession } from '@remscodes/ngx-renault-api-client';
import { AccountInfo, Person } from '@remscodes/renault-api';
import { Nullable, Optional } from '../../../shared/models/shared.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthInfoService {

  public constructor() {
    this.onEffect();
  }

  private storageService: StorageService = inject(StorageService);
  private session: NgxRenaultSession = inject(NgxRenaultSession);

  public personId: WritableSignal<Nullable<string>> = signal(null);
  public person: WritableSignal<Nullable<Person>> = signal(null);

  public selectedAccountId: WritableSignal<Nullable<string>> = signal(this.storageService.getAccountId());

  public selectedAccount: Signal<Optional<AccountInfo>> = computed(() => {
    return this.person()?.accounts?.find(acc => acc.accountId === this.selectedAccountId());
  });

  public isAuth(): boolean {
    return !!this.person();
  }

  private onEffect(): void {
    effect(() => {
      const accountId: Nullable<string> = this.selectedAccountId();

      if (accountId) {
        this.storageService.setAccountId(accountId);
        this.session.accountId = accountId;
      }
      else {
        this.storageService.clearAccountId();
        this.session.accountId = undefined;
      }
    });
  }
}
