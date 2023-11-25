import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private data: AddScheduleDialogComponentData = inject(MAT_DIALOG_DATA);
  private dialogRef: MatDialogRef<AddTimeScheduleDialogComponent> = inject(MatDialogRef);

  public form: FormGroup = new FormGroup({
    time: new FormControl(dayjs(this.data.time).format('HH:mm'), Validators.required),
  });

  public onSubmit(): void {
    if (!this.form.valid) return;

    this.dialogRef.close(this.form.value.time);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
