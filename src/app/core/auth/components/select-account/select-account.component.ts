import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Account } from '@remscodes/renault-api';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Bouncer } from '../../../../shared/services/bouncer.service';
import { AuthStore } from '../../services/auth-store.service';

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

  private authInfo = inject(AuthStore);
  private bouncer = inject(Bouncer);
  private formBuilder = inject(FormBuilder);

  public accounts: Signal<Account[]> = computed(() => this.authInfo.person()?.accounts ?? []);

  public form = this.formBuilder.group({
    accountId: [this.authInfo.accountId(), Validators.required],
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
