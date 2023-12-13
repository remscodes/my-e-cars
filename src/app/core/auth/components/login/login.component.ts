import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { concatMap, finalize } from 'rxjs';
import { PanelComponent } from '../../../../shared/components/panel/panel.component';
import { BetterRouter } from '../../../../shared/services/better-router.service';
import { Loading } from '../../../../shared/services/loading.service';
import { Auth } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    PanelComponent,
  ],
})
export class LoginComponent {

  private auth = inject(Auth);
  private router = inject(BetterRouter);
  private loading = inject(Loading);
  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public form = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.form.invalid) return;

    const { login, password } = this.form.value;

    this.connect(login!, password!);
  }

  private connect(login: string, password: string): void {
    this.loading.start();
    this.auth.login(login, password).pipe(
      concatMap(() => this.auth.getJWT()),
      concatMap(() => this.auth.getAuthInfos()),
      finalize(() => this.loading.stop()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: () => this.router.navigate(['select-account']).then(),
    });
  }
}
