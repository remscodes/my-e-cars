import { NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChargingSettings, DateType, Day } from '@remscodes/renault-api';
import { fade } from '../../../../../../shared/animations/fade.animation';
import { DAYS } from '../../../../../../shared/contants/day.constants';
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
  templateUrl: './charge-mode.component.html',
  styleUrls: ['./charge-mode.component.css'],
  animations: [fade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    WeekRibbonComponent,
  ],
})
export class ChargeModeComponent implements OnInit {

  public constructor(
    private loading: Loading,
    private router: BetterRouter,
    private dialog: MatDialog,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  ) { }

  public options: Option[] = [
    {
      label: 'Instantanée',
      mode: 'always',
      icon: 'cable',
    },
    {
      label: 'Différée',
      mode: 'always_charging',
      icon: 'cable',
    },
    {
      label: 'Personnalisée',
      mode: 'schedule_mode',
      icon: 'cable',
    },
  ];

  public selectedMode?: string;
  public timeSchedule?: DateType;
  public weekSchedules: BetterSchedule[] = [];

  public ngOnInit(): void {
    this.getChargeMode();
  }

  private getChargeMode(): void {
    this.loading.start();
    // this.vehicleService.readChargingSettings().pipe(
    //   finalize(() => this.loading.stop()),
    //   takeUntilDestroyed(this.destroyRef),
    // ).subscribe({
    //   next: ({ body: chargeMode }: HttpResponse<ChargingSettings>) => {
    //     this.selectedMode = chargeMode?.mode;
    //     this.weekSchedules = this.toSchedule(chargeMode?.schedules ?? []);
    //   },
    // });
  }

  public selectMode(mode: string): void {
    this.selectedMode = mode;
  }

  public back(): void {
    this.router.back();
  }

  public openTimeScheduler(): void {
    this.dialog.open(AddTimeScheduleDialogComponent, {
      id: 'AddScheduleDialogComponentId',
      data: {
        time: this.timeSchedule,
      },
    }).afterClosed()
      .subscribe({
        next: (time: string) => {
          this.timeSchedule = time;
          this.cdr.markForCheck();
        },
      });
  }

  public openWeekScheduler(index: number): void {
    this.dialog.open(AddWeekScheduleDialogComponent, {
      id: 'AddWeekScheduleDialogComponentId',
      data: {
        index,
        schedule: this.weekSchedules.at(index),
      },
    }).afterClosed()
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
