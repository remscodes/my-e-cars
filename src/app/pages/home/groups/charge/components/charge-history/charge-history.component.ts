import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxKamereonClient } from '@remscodes/ngx-renault-api-client';
import { ChargeDetails, Charges } from '@remscodes/renault-api';
import dayjs from 'dayjs';
import { finalize } from 'rxjs';
import { VehicleInfoService } from '../../../../../../core/renault/services/vehicle-info.service';
import { Optional } from '../../../../../../shared/models/shared.model';
import { BetterRouter } from '../../../../../../shared/services/better-router.service';
import { Loading } from '../../../../../../shared/services/loading.service';
import { ChargeComponent } from '../charge/charge.component';

@Component({
  templateUrl: './charge-history.component.html',
  styleUrl: './charge-history.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ChargeComponent,
  ],
})
export class ChargeHistoryComponent implements OnInit {

  private router: BetterRouter = inject(BetterRouter);
  private loading: Loading = inject(Loading);
  private kamereon: NgxKamereonClient = inject(NgxKamereonClient);
  private vehicleInfoService: VehicleInfoService = inject(VehicleInfoService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public form: FormGroup = new FormGroup({
    startDate: new FormControl(dayjs().subtract(1, 'week').toDate()),
    endDate: new FormControl('06-23-2023'),
  });

  public charges: Optional<ChargeDetails[]>;

  public ngOnInit(): void {
    this.getCharges();
  }

  private getCharges(): void {
    const vin = this.vehicleInfoService.selectedVin();
    if (!vin) return;

    const { startDate: start, endDate: end } = this.form.value;

    this.loading.start();
    this.kamereon.readCharges({ start, end }, vin).pipe(
      finalize(() => this.loading.stop()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (chargesRes: Charges) => {
        this.charges = chargesRes.charges;
      },
    });
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }

  public back(): void {
    this.router.back();
  }

  public trackByDate = (_i: number, { chargeStartDate }: ChargeDetails) => chargeStartDate;
}
