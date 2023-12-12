import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '../models/dialog-data.model';

interface ConfirmationResult {
  accepted?: () => void;
  canceled?: () => void;
}

@Injectable({ providedIn: 'root' })
export class Evaluator {

  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  public confirm(dialogConfig: MatDialogConfig<DialogData>, result?: ConfirmationResult): void {
    this.dialog
      .open(ConfirmationDialogComponent, dialogConfig)
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (hasConfirmed: boolean) => (hasConfirmed)
          ? result?.accepted?.()
          : result?.canceled?.(),
      });
  }
}
