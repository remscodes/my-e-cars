import { RemsDialogRef } from '@/rems-element/dialog/services/rems-dialog-ref.service';
import { REMS_DIALOG_DATA } from '@/rems-element/dialog/tokens/rems-dialog-data.token';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

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
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {

  public constructor(
    @Inject(REMS_DIALOG_DATA) public data: DialogData,
    public dialogRef: RemsDialogRef
  ) { }
}
