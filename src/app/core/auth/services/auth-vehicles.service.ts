import { DestroyRef, effect, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '../../../shared/models/shared.model';
import { AuthStore } from './auth-store.service';
import { Auth } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthVehicles {

  public constructor() {
    this.$fetchVehicles();
  }

  private auth = inject(Auth);
  private authStore = inject(AuthStore);
  private destroyRef = inject(DestroyRef);

  private $fetchVehicles(): void {
    effect(() => {
      const accountId: Nullable<string> = this.authStore.accountId();
      if (!accountId) return;

      this.auth.getVehicles(accountId).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
    }, { allowSignalWrites: true });
  }
}
