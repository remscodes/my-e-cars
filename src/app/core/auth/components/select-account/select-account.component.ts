import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Account } from '@remscodes/renault-api';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Bouncer } from '../../../../shared/services/bouncer.service';
import { AuthStoreService } from '../../services/auth-store.service';

@Component({
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    PanelComponent,
    SpinnerComponent,
  ],
})
export class SelectAccountComponent {

  private authInfo = inject(AuthStoreService);
  private bouncer = inject(Bouncer);

  public accounts: Signal<Account[]> = computed(() => this.authInfo.person()?.accounts ?? []);

  public form = new FormGroup({
    accountId: new FormControl(this.authInfo.accountId(), Validators.required),
  });

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { accountId } = this.form.value;

    this.authInfo.accountId.set(accountId!);
  }

  public logout(): void {
    this.bouncer.disconnect();
  }
}
