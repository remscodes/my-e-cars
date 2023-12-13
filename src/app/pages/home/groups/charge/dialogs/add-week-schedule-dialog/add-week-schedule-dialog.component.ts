import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BetterSchedule } from '../../components/charge-mode/charge-mode.component';
import { WeekRibbonComponent } from '../../components/week-ribbon/week-ribbon.component';

export interface AddWeekScheduleDialogComponentData {
  index: number;
  schedule: BetterSchedule;
}

@Component({
  templateUrl: './add-week-schedule-dialog.component.html',
  styleUrl: './add-week-schedule-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    WeekRibbonComponent,
  ],
})
export class AddWeekScheduleDialogComponent {

  private data = inject<AddWeekScheduleDialogComponentData>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<AddWeekScheduleDialogComponent>>(MatDialogRef);

  public planningNumber: number = this.data.index;
  public schedule: BetterSchedule = this.data.schedule;

  public close(): void {
    this.dialogRef.close();
  }
}
