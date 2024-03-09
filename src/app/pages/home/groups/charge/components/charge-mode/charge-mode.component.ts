import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxKamereonClient } from '@remscodes/ngx-renault-api-client';
import { ChargingSettings, DateType, Day } from '@remscodes/renault-api';
import { finalize } from 'rxjs';
import { DAYS } from '../../../../../../core/renault/constants/day.constants';
import { fade } from '../../../../../../shared/animations/fade.animation';
import { BetterRouter } from '../../../../../../shared/services/better-router.service';
import { Loading } from '../../../../../../shared/services/loading.service';
import { AddTimeScheduleDialogComponent } from '../../dialogs/add-time-schedule-dialog/add-time-schedule-dialog.component';
import { AddWeekScheduleDialogComponent } from '../../dialogs/add-week-schedule-dialog/add-week-schedule-dialog.component';
import { EnabledDay, WeekRibbonComponent } from '../week-ribbon/week-ribbon.component';

interface Option {
  label: string;
  mode: string;
  icon: string;
}

export interface BetterSchedule {
  activated: boolean;
  startTime?: string;
  endTime?: string;
  days: EnabledDay[];
}

@Component({
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    WeekRibbonComponent,
  ],
  templateUrl: './charge-mode.component.html',
  styleUrl: './charge-mode.component.css',
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeModeComponent implements OnInit {

  private loading = inject(Loading);
  private router = inject(BetterRouter);
  private dialog = inject(MatDialog);
  private kamereon = inject(NgxKamereonClient);
  private destroyRef = inject(DestroyRef);

  public options: Option[] = [
    { label: 'Instantanée', mode: 'always', icon: 'cable' },
    { label: 'Différée', mode: 'always_charging', icon: 'cable' },
    { label: 'Personnalisée', mode: 'schedule_mode', icon: 'cable' },
  ];

  public selectedMode?: string;
  public timeSchedule?: DateType;
  public weekSchedules: BetterSchedule[] = [];

  public ngOnInit(): void {
    this.getChargeMode();
  }

  private getChargeMode(): void {
    this.loading.start();
    this.kamereon.readChargingSettings().pipe(
      finalize(() => this.loading.stop()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (chargeMode: ChargingSettings) => {
        this.selectMode(chargeMode.mode!);
        console.log(this.selectedMode);
        this.weekSchedules = this.toSchedule(chargeMode?.schedules ?? []);
      },
    });
  }

  public selectMode(mode: string): void {
    this.selectedMode = mode;
  }

  public back(): void {
    this.router.back();
  }

  public openTimeScheduler(): void {
    this.dialog
      .open(AddTimeScheduleDialogComponent, {
        id: 'AddScheduleDialogComponentId',
        data: {
          time: this.timeSchedule,
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (time: string) => {
          this.timeSchedule = time;
        },
      });
  }

  public openWeekScheduler(index: number): void {
    this.dialog
      .open(AddWeekScheduleDialogComponent, {
        id: 'AddWeekScheduleDialogComponentId',
        data: {
          index,
          schedule: this.weekSchedules.at(index),
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {

        },
      });
  }

  private toSchedule(schedules: ChargingSettings['schedules'] = []): BetterSchedule[] {
    return schedules.reduce((acc: BetterSchedule[], shed) => {
      if (!shed.activated) {
        const days: EnabledDay[] = DAYS.reduce((final: EnabledDay[], day: Day) => {
          final.push({ day, enabled: false });
          return final;
        }, []);
        acc.push({ activated: false, days });
        return acc;
      }

      const days: EnabledDay[] = DAYS.reduce((final: EnabledDay[], day: Day) => {
        final.push({ day, enabled: day in shed });
        return final;
      }, []);

      const startTime: string
        = shed.monday?.startTime
        ?? shed.tuesday?.startTime
        ?? shed.wednesday?.startTime
        ?? shed.thursday?.startTime
        ?? shed.friday?.startTime
        ?? shed.saturday?.startTime
        ?? shed.sunday!.startTime!;

      const endTime: string
        = shed.monday?.startTime
        ?? shed.tuesday?.startTime
        ?? shed.wednesday?.startTime
        ?? shed.thursday?.startTime
        ?? shed.friday?.startTime
        ?? shed.saturday?.startTime
        ?? shed.sunday!.startTime!;

      acc.push({
        activated: true,
        startTime,
        endTime,
        days,
      });
      return acc;
    }, []);
  };
}
