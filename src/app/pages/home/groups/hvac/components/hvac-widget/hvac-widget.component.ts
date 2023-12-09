import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxKamereonClient } from '@remscodes/ngx-renault-api-client';
import { HvacStatus } from '@remscodes/renault-api';
import { VehicleInfoService } from '../../../../../../core/renault/services/vehicle-info.service';
import { Nullable } from '../../../../../../shared/models/shared.model';

@Component({
  selector: 'app-hvac-widget',
  templateUrl: './hvac-widget.component.html',
  styleUrl: './hvac-widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
})
export class HvacWidgetComponent implements OnInit {

  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);
  private kamereon: NgxKamereonClient = inject(NgxKamereonClient);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public hvacStatus: Signal<Nullable<HvacStatus>> = this.vehicleInfoService.hvacStatus;

  public ngOnInit(): void {
    if (!this.hvacStatus) this.getHvacStatus();
  }

  private getHvacStatus(): void {
    this.kamereon.readHvacStatus().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (value: HvacStatus) => {
        this.vehicleInfoService.updateHvacStatus(value);
      },
    });
  }

  public toggleHvac(): void {
    // const vin = this.vehicleInfoService.selectedVin();
    // if (!vin) return;
    //
    // this.kamereon.performHvacStart({}, vin);
  }
}
