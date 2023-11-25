import { NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Person } from '@remscodes/renault-api';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { Nullable } from '../../../../shared/models/shared.model';
import { Bouncer } from '../../../../shared/services/bouncer.service';
import { AuthInfoService } from '../../services/auth-info.service';

@Component({
  templateUrl: './init-select-account.component.html',
  styleUrl: './init-select-account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    PanelComponent,
    SpinnerComponent,
  ],
})
export class InitSelectAccountComponent {

  public constructor(
    private authInfoService: AuthInfoService,
    private bouncer: Bouncer,
  ) { }

  public person: Signal<Nullable<Person>> = this.authInfoService.person;

  public accounts = this.authInfoService.person()?.accounts ?? [];

  public form: FormGroup = new FormGroup({
    accountId: new FormControl(this.authInfoService.selectedAccountId(), Validators.required),
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
