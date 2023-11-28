import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  message?: string;
  yesLabel?: string;
  noLabel?: string;
  type?: DialogType;
}

export type DialogType =
  | 'basic'
  | 'warn';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgIf,
  ],
})
export class ConfirmationDialogComponent {

  public data: DialogData = inject(MAT_DIALOG_DATA);
  public dialogRef: MatDialogRef<this> = inject(MatDialogRef);
}
