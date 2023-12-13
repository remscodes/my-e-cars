import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DateType } from '@remscodes/renault-api';
import dayjs from 'dayjs';

export interface AddScheduleDialogComponentData {
  time: DateType;
}

@Component({
  templateUrl: './add-time-schedule-dialog.component.html',
  styleUrl: './add-time-schedule-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AddTimeScheduleDialogComponent {

  private data = inject<AddScheduleDialogComponentData>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<AddTimeScheduleDialogComponent>>(MatDialogRef);
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    time: [dayjs(this.data.time).format('HH:mm'), Validators.required],
  });

  public onSubmit(): void {
    if (!this.form.valid) return;

    const { time } = this.form.value;

    this.dialogRef.close(time);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
