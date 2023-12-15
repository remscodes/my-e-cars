import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { SnackBarData } from '../../models/snack-bar-data.model';

@Component({
  templateUrl: './basic-snackbar.component.html',
  styleUrl: './basic-snackbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
  ],
})
export class BasicSnackbarComponent {

  public data = inject<SnackBarData>(MAT_SNACK_BAR_DATA);
  public snackBarRef = inject<MatSnackBarRef<BasicSnackbarComponent>>(MatSnackBarRef);
}
