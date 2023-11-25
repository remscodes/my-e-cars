import { DatePipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BatteryStatus, PlugStatus } from '@remscodes/renault-api';
import { VehicleInfoService } from '../../../../../../core/renault/services/vehicle-info.service';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { Nullable } from "../../../../../../shared/models/shared.model";
import { MinuteToHourPipe } from '../../../../../../shared/pipes/minute-to-hour.pipe';
import { ChargeActionsComponent } from '../charge-actions/charge-actions.component';

@Component({
  selector: 'app-charge-widget',
  templateUrl: './charge-widget.component.html',
  styleUrl: './charge-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MinuteToHourPipe,
    DatePipe,
    ChargeActionsComponent,
    SpinnerComponent,
  ],
})
export class ChargeWidgetComponent implements OnInit {

  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public batteryStatus: Signal<Nullable<BatteryStatus>> = this.vehicleInfoService.batteryStatus;

  public isCharging: Signal<boolean> = computed(() => this.batteryStatus()?.plugStatus === PlugStatus.PLUGGED);

  public batteryGradient: Signal<string> = computed(() => {
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
    // this.vehicleService.readBatteryStatus().pipe(
    //   finalize(() => this.isLoading = false),
    //   takeUntilDestroyed(this.destroyRef),
    // ).subscribe({
    //   next: ({ body: batteryStatus }: HttpResponse<BatteryStatus>) => {
    //     if (!batteryStatus) return;
    //
    //     this.vehicleInfoService.updateBatteryStatus(batteryStatus);
    //   },
    // });
  };

  public toggle(): void {
    this.revealActions = !this.revealActions;
  }
}
