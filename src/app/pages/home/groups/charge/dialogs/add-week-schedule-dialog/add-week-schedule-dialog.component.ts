import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BetterSchedule } from '../../components/charge-mode/charge-mode.component';

export interface AddWeekScheduleDialogComponentData {
  index: number;
  schedule: BetterSchedule;
}

@Component({
  templateUrl: './add-week-schedule-dialog.component.html',
  styleUrls: ['./add-week-schedule-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class AddWeekScheduleDialogComponent {

  public planningNumber: number;
  public schedule: BetterSchedule;

  public constructor(
    @Inject(MAT_DIALOG_DATA) { index, schedule }: AddWeekScheduleDialogComponentData,
    private dialogRef: MatDialogRef<AddWeekScheduleDialogComponent>,
  ) {
    this.planningNumber = index;
    this.schedule = schedule;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
