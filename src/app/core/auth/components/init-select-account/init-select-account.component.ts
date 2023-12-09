import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Account } from '@remscodes/renault-api';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Bouncer } from '../../../../shared/services/bouncer.service';
import { AuthInfoService } from '../../services/auth-info.service';

@Component({
  templateUrl: './init-select-account.component.html',
  styleUrl: './init-select-account.component.css',
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
export class InitSelectAccountComponent {

  private authInfoService: AuthInfoService = inject(AuthInfoService);
  private bouncer: Bouncer = inject(Bouncer);

  public accounts: Signal<Account[]> = computed(() => this.authInfoService.person()?.accounts ?? []);

  public form: FormGroup = new FormGroup({
    accountId: new FormControl(this.authInfoService.selectedAccountId() ?? '', Validators.required),
  });

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { accountId } = this.form.value;

    this.authInfoService.selectedAccountId.set(accountId);
  }

  public logout(): void {
    this.bouncer.disconnect();
  }
}
