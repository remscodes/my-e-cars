import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { concatMap, finalize } from 'rxjs';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { BetterRouter } from '../../../../shared/services/better-router.service';
import { Loading } from '../../../../shared/services/loading.service';
import { basicForm } from '../../../../shared/utils/form-utils';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    PanelComponent,
  ],
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private router: BetterRouter = inject(BetterRouter);
  private loading: Loading = inject(Loading);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public form: FormGroup = basicForm(['login', 'password']);

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { login, password } = this.form.value;

    this.connect(login, password);
  }

  private connect(login: string, password: string): void {
    this.loading.start();
    this.authService.login(login, password).pipe(
      concatMap(() => this.authService.getJWT()),
      concatMap(() => this.authService.getAuthInfos()),
      finalize(() => this.loading.stop()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => this.router.navigate(['init-select-account']).then(),
    });
  }
}
