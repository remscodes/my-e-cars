import { DestroyRef, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { finalize, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BasicSnackbarComponent } from '../../components/basic-snackbar/basic-snackbar.component';
import { Optional } from '../models/shared.model';

export interface AnnounceStatus {
  active: boolean;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class Announcer {

  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  public status: WritableSignal<AnnounceStatus> = signal({ active: false });

  public notify(message: string, duration?: number): void {
    this.createSnackBar(message, duration);
  }

  public warn(message: string, duration?: number): void {
    this.createSnackBar(message, duration, 'warn');
  }

  private createSnackBar(message: string, duration: Optional<number>, type: string = 'basic'): void {
    if (environment.devkit.logAnnounce) console.info(message);
    const snackBarRef: MatSnackBarRef<BasicSnackbarComponent> = this.snackBar.openFromComponent(BasicSnackbarComponent, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration,
      data: { message, type },
    });
    this.subToSnackBarStates(snackBarRef);
  }

  private subToSnackBarStates(snackBarRef: MatSnackBarRef<BasicSnackbarComponent>): void {
    snackBarRef.afterOpened().pipe(
      first(),
      finalize(() => this.status.set({
        active: true,
        type: snackBarRef.instance.data.type ?? 'basic',
      })),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();

    snackBarRef.afterDismissed().pipe(
      first(),
      finalize(() => this.status.set({
        active: false,
      })),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }
}
