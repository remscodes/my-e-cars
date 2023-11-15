import { AuthService } from '@/auth/services/auth.service';
import { BetterRouter } from '@/shared/services/better-router.service';
import { Loading } from '@/shared/services/loading.service';
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { concatMap, finalize } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public constructor(
    private authService: AuthService,
    private router: BetterRouter,
    private loading: Loading,
    private destroyRef: DestroyRef
  ) { }

  /* ------- */

  public loginControl: FormControl = new FormControl('', Validators.required);
  public passwordControl: FormControl = new FormControl('', Validators.required);

  public form: FormGroup = new FormGroup({
    login: this.loginControl,
    password: this.passwordControl
  });

  /* ------- */

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { login, password } = this.form.value;

    this.connect(login, password);
  }

  private connect(login: string, password: string): void {
    this.loading.start();
    this.authService.login(login, password).pipe(
      concatMap(() => this.authService.getAuthInfos()),
      finalize(() => this.loading.stop()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.router.navigate(['init-select-account']).then();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  public get isInvalid(): boolean {
    return this.loginControl.touched
      && !this.loginControl.valid
      && this.passwordControl
      && !this.passwordControl.valid;
  }

  public enableDemo(): void {
    this.connect('1', '1');
  }
}
