import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxKamereonClient } from '@remscodes/ngx-renault-api-client';
import { BatteryStatus, PlugStatus } from '@remscodes/renault-api';
import { finalize } from 'rxjs';
import { VehicleStore } from '../../../../../../core/renault/services/vehicle-store.service';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { Nullable } from "../../../../../../shared/models/shared.model";
import { MinuteToHourPipe } from '../../../../../../shared/pipes/minute-to-hour.pipe';
import { ChargeActionsComponent } from '../charge-actions/charge-actions.component';

@Component({
  selector: 'app-charge-widget',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MinuteToHourPipe,
    DatePipe,
    ChargeActionsComponent,
    SpinnerComponent,
  ],
  templateUrl: './charge-widget.component.html',
  styleUrl: './charge-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChargeWidgetComponent implements OnInit {

  private vehicleStore = inject(VehicleStore);
  private kamereon = inject(NgxKamereonClient);
  private destroyRef = inject(DestroyRef);

  public batteryStatus: Signal<Nullable<BatteryStatus>> = this.vehicleStore.batteryStatus;

  public isCharging = computed<boolean>(() => this.batteryStatus()?.plugStatus === PlugStatus.PLUGGED);
  public batteryGradient = computed<string>(() => {
    const color: string = (this.batteryStatus()?.plugStatus === PlugStatus.PLUGGED) ? '#00f000' : 'lightblue';
    return `linear-gradient(to right, ${color} ${this.batteryStatus()?.batteryLevel ?? 0}%, white ${this.batteryStatus()?.batteryLevel ?? 0}%)`;
  });

  public revealActions: boolean = false;
  public isLoading: boolean = false;

  public ngOnInit(): void {
    if (!this.batteryStatus()) this.getBatteryStatus();
  }

  public getBatteryStatus(): void {
    this.isLoading = true;
    this.kamereon.readBatteryStatus().pipe(
      finalize(() => this.isLoading = false),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (status: BatteryStatus) => {
        this.vehicleStore.updateBatteryStatus(status);
      },
    });
  };

  public toggle(): void {
    this.revealActions = !this.revealActions;
  }
}
