import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hvac-widget',
  templateUrl: './hvac-widget.component.html',
  styleUrls: ['./hvac-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
})
export class HvacWidgetComponent implements OnInit {

  public constructor(
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    // this.getHvacStatus();
  }

  private getHvacStatus(): void {
    // this.vehicleService.readHvacStatus().pipe(
    //   takeUntilDestroyed(this.destroyRef),
    // ).subscribe({
    //   next: () => {
    //
    //   },
    // });
  }

  public toggleHvac(): void {
    // this.vehicleService.performHvacStart()
  }
}
