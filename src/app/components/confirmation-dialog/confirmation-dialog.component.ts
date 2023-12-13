import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../shared/models/dialog-data.model';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ConfirmationDialogComponent {

  public data = inject<DialogData>(MAT_DIALOG_DATA);
  public dialogRef = inject<MatDialogRef<ConfirmationDialogComponent>>(MatDialogRef);
}
