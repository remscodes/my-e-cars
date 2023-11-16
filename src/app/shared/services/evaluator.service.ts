import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent, DialogData } from '../../components/confirmation-dialog/confirmation-dialog.component';

export interface ConfirmationResult {
  accepted?: () => void;
  canceled?: () => void;
}

@Injectable({ providedIn: 'root' })
export class Evaluator {

  public constructor(
    private dialog: MatDialog,
  ) { }

  public confirm(dialogConfig: MatDialogConfig<DialogData>, result?: ConfirmationResult): void {
    this.dialog.open(ConfirmationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (hasConfirmed: boolean) => (hasConfirmed)
          ? result?.accepted?.()
          : result?.canceled?.(),
      });
  }
}
