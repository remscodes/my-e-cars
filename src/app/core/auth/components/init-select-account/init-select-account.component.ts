import { AuthInfoService } from '@/auth/services/auth-info.service';
import { Account, Person } from '@/renault/kamereon/models/person.model';
import { Nullable } from '@/shared/models/shared.model';
import { Bouncer } from '@/shared/services/bouncer.service';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './init-select-account.component.html',
  styleUrls: ['./init-select-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitSelectAccountComponent {

  public constructor(
    private authInfoService: AuthInfoService,
    private bouncer: Bouncer
  ) { }

  /* ------- */

  public person: Signal<Nullable<Person>> = this.authInfoService.person;

  public accounts: Account[] = this.authInfoService.person()?.accounts ?? [];

  public accountIdControl: FormControl = new FormControl(this.authInfoService.selectedAccountId(), Validators.required);

  public form: FormGroup = new FormGroup({
    accountId: this.accountIdControl
  });

  /* ------- */

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { accountId } = this.form.value;

    this.authInfoService.selectedAccountId.set(accountId);
  }

  public logout(): void {
    this.bouncer.disconnect();
  }
}
